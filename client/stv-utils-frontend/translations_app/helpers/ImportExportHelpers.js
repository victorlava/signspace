var constants           = require('../constants.js').constants;
var gulp                = require('gulp');
var fs                  = require('fs');
var path                = require('path');
var xlsx                = require('node-xlsx');
var zip                 = require('gulp-zip');
var decompress          = require('gulp-decompress');
var merge               = require('merge'), original, cloned;
var glob                = require("glob");
var po2json             = require('po2json');

var exportTranslations = function(options) {

    var colectedTranslations = [];
    var scanedProjects = 1;
    var projectsToScan = constants.projects.filter((p) => {return !p.onlyCopy}).length;

    if (!fs.existsSync(constants.buildDirectory)) {
        fs.mkdirSync(constants.buildDirectory);
    }

    constants.projects.forEach(function(project, projectIndex) {
        if (project.onlyCopy) {
            gulp.src(project.filesLocation + '*.' + project.type)
                .pipe(zip(project.name + '.zip'))
                .pipe(gulp.dest(constants.buildDirectory));
        } else {

            var globPatern = project.files ? '!' : project.filesLocation + project.searchPatern;

            glob(globPatern, {}, function (er, files) {

                    var filesObject = {};
                    var header = ['project', 'id'];
                    var filesColected = 1;
                    var colectedIds = [];
                    var translations = [];

                    if (project.files) {
                        files = [];
                        for (var key in project.files) {
                            files.push(project.files[key]);
                        }
                    }

                    if (files.length < constants.supportedLanguages.length || files.length > constants.supportedLanguages.length) {
                        return false;
                    }

                    files.forEach(function(filePath, filePathIndex) {
                        if (project.files) {
                            for (var key in project.files) {
                                filesObject[key] = project.files[key];
                            }
                        } else {
                            filesObject[path.basename(filePath, '.' + project.type)] = filePath;
                        }
                    });

                    for(var localeName in filesObject) {

                        if (!filesObject[localeName]) {
                            header.push(localeName);
                        } else {

                            var fileData = fs.readFileSync(filesObject[localeName], 'utf8');
                            var normalizedJson = convertFileToJson(fileData, project);

                            header.push(localeName);

                            for (var key in normalizedJson) {
                                if (project.includeOnly && project.includeOnly.length && project.includeOnly.indexOf(key) === -1) {
                                    continue;
                                }

                                if (project.excludeOnly && project.excludeOnly.length && project.excludeOnly.indexOf(key) > -1) {
                                    continue;
                                }

                                var idIsAlreadyColected = colectedIds.indexOf(key);

                                if (idIsAlreadyColected > -1) {
                                    translations[idIsAlreadyColected][filesColected + 1] = normalizedJson[key];
                                } else {
                                    var translationToAppend = [];

                                    for (i = 0; i < (constants.supportedLanguages.length + 2); i++) {
                                        translationToAppend.push('');
                                    }

                                    translationToAppend[0] = project.name;
                                    translationToAppend[1] = key;
                                    translationToAppend[filesColected + 1] = normalizedJson[key];

                                    translations.push(translationToAppend);
                                    colectedIds.push(key);
                                }

                            };
                        }

                        filesColected++;
                    }

                    translations.unshift(header);
                    colectedTranslations.push(translations);

                    if (scanedProjects === projectsToScan) {
                        var falttenedArray = colectedTranslations.reduce(function(a, b) {
                            return a.concat(b);
                        });

                        var buffer = xlsx.build([{name: "Translations", data: falttenedArray}]);
                        fs.writeFile(constants.buildDirectory + 'translations.xlsx', buffer, 'binary');
                    }

                    scanedProjects++;
            });
        }
    });
}

var importTranslations = function() {
    glob(constants.buildDirectory + '*.*', {}, function (er, files) {
        files.forEach(function(filePath, fileKey) {

            var fileExt = filePath.split('.').pop();

            if (fileExt === 'zip') {
                var project = findProjectByName(path.basename(filePath, '.zip'));
                gulp.src(filePath)
                    .pipe(decompress({strip: 1}))
                    .pipe(gulp.dest(project.filesLocation));
            }

            if (fileExt === 'xlsx') {
                var data = xlsx.parse(filePath)[0]['data'];
                var groupedProjects = [];
                var projectKey = -1;

                data.forEach(function(value, index) {
                    if (value[0] === 'project') {
                        groupedProjects.push([]);
                        projectKey++;
                    }
                    groupedProjects[projectKey].push(value)
                });

                groupedProjects.forEach(function(importedTranslations, importedTranslationsIndex) {

                    project = findProjectByName(importedTranslations[1][0]);

                    importedTranslations[0].forEach((locale, localeKey) => {

                        if (locale !== 'project' && locale !== 'id') {

                            var jsonData = {};
                            var propertiesData = '';
                            var poData = '';

                            var fileToWrite = null;
                            var dataToWrite = null;

                            if (project.files) {
                                for (var key in project.files) {

                                    if (locale == key && project.files[key]){
                                        fileToWrite = project.files[key];
                                        break;
                                    }

                               }
                            } else {
                                fileToWrite = project.filesLocation + locale + '.' + project.type
                            }

                            if (fileToWrite && fs.existsSync(fileToWrite)) {
                                importedTranslations.forEach((translation, translationKey) => {
                                    if (translationKey > 0) {
                                        jsonData[translation[1]] = translation[localeKey] ? translation[localeKey] : '';
                                    }
                                });

                                var originalfile = fs.readFileSync(fileToWrite, 'utf8')
                                originalfile = convertFileToJson(originalfile, project);
                                jsonData = merge(originalfile, jsonData);

                                if (project.type === 'properties' && project.textSepparator) {
                                    for (var key in jsonData) {
                                        propertiesData += key.toString() + project.textSepparator.toString() + jsonData[key].toString() + '\n';
                                    };
                                    dataToWrite = propertiesData;

                                } else if (project.type === 'po') {
                                    for (var key in jsonData) {
                                        // TODO: Add po file head data
                                        poData += '\n';
                                        poData += 'msgid "' + key.toString() + '"\n';
                                        poData += 'msgstr "' + jsonData[key].toString() + '"\n';
                                    };
                                    dataToWrite = poData;
                                } else {
                                    for (let key in jsonData) {
                                        jsonData[key] = jsonData[key].toString();
                                    }
                                    dataToWrite = JSON.stringify(jsonData, null, 4);
                                }

                                fs.writeFileSync(fileToWrite, dataToWrite);
                            }
                        }
                    });
                });
            }
        });
    });
}

var convertFileToJson = function(file, project) {
    var json = {};

    if (project.type === 'properties' && project.textSepparator) {
        file = file.split('\n');
        file.forEach(function(value, index){
            if (value.length){
                var stringParts = value.split(project.textSepparator);
                var id = stringParts[0];
                var value = stringParts.slice(1).join(project.textSepparator);
                json[id] = value.toString();
            }
        });
    } else if (project.type === 'po') {
        var jsonData = po2json.parse(file);
        for(var key in jsonData) {
            if (jsonData[key][1]) {
                json[key] = jsonData[key][1].toString();
            }
        }
    } else if (project.type === 'json') {
        json = JSON.parse(file, (key, value) => {
            return typeof value === 'number' ? value.toString() : value;
        });
    }
    return json;
}

var findProjectByName = function(projectName) {
    var projects = constants.projects.filter((r) => {
        return projectName === r.name;
    });
    return projects[0];
}

module.exports = {
    exportTranslations: exportTranslations,
    importTranslations: importTranslations
}
