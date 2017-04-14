var constants           = require('./constants.js').constants;
var ImportExportHelpers = require('./helpers/ImportExportHelpers.js');
var gulp                = require('gulp');
var del                 = require('del');

gulp.task('export', function() {
    del(constants.buildDirectory + '*.*').then(() => {;
        ImportExportHelpers.exportTranslations();
    });
});

gulp.task('import', function() {
    ImportExportHelpers.importTranslations();
});
