# Initialization #

Before the project can be executed is has to be initialized in particular order. Currently the project depends on NodeJS.

 1. Run `npm install` at the project root/client to install required NodeJS packages locally.
 2. Make sure, that dirs paths match in file constants.js

# Exporting #

Does several exporting actions:
* Copies & converts from json, messgage an other source files to Excel (which later can be copy-pasted to confulence)
* Copies & zips template files

 1. Execute `gulp export` at the root/client of the project 
 2. Exported files can be found in build dir

# Importing #

Does several importing actions:
* Copies & converts from Excel to json, messgage an other source files (which later can be reviewed and commited to GIT)
* Unzips & copies template files

 1. Put updated translation files to build dir. IMPORTANT: Do not change filenames or header texts in excel files
 2. Execute `gulp import` at the root/client of the project 
 