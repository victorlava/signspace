# About #

Package stv-utils-frontend is a library of components, common in Qvarn client applications (ServicePortal, Taito and similar)

# Initialization #

 1. Run `npm install git+ssh://git@git.tilaajavastuu.io/stv-utils-frontend.git#2.0.5 --save`

# Dependencies #

1. ReactJS - TopMenuComponent must be included as react component
2. Bootstrap 4.0.0-alpha.6
3. jQuery - Can be included via CDN or With Webpack loaders
3. Font awesome icons - Can be included via CDN or With Webpack loaders

# TopMenuComponent <TopMenuComponent />#

## Component props ##
Prop | Type | Description
--- | --- | ---
showAnonymousUserLanguageSelector | boolean | If language selector should be shown for anonymous user
showAnonymousUserBackLink | boolean | If "Back to Tilaajavastuu.fi" link should be shown for anonymous user
showAnonymousUserSignInLink | boolean | If "Sing in" link should be shown for anonymous user
showSignedInUserLanguageSelector | boolean | If language selector should be shown for signed in user
showSignedInUserProfileLinks | boolean | If profile links should be shown for signed in user
showSignedInUserOrganizationMenu | boolean | If organization menu should be shown for signed in user
showSignedInUserEnviromentSelector | boolean | If enviroment selection menu should be shown for signed in user
showSignedInUserOrganizationInfoLink | boolean | If organization information link should be shown for signed in user
showSignedInUserManageUsersLink | boolean | If user management link should be shown for signed user
showSignedInQatUserLink | boolean | If Qvarn Access Tools should be shown for signed user
allOrganizationsLinkData | object | {showLink: true|false, count: 20|null, isAdmin: true|false} If all organizations link  should be shown for signed user
selectedLanguageCode | string | Code of a selected language ('en', 'fi', 'sv' or 'et').
onLanguageChanged | function | Function, accepting string argument 'languageCode', which does whatever is needed for host application to switch GUI language
onSignInClicked | function | Function without arguments, which does whatever is needed for sign in user
onSignOutClicked | function | Function without arguments, which does whatever is needed for sign out user
signedInUserFirstName | string | First name of currently signed in user. Null if user is not signed in.
signedInUserLastName | string | Last name of currently signed in user. Null if user is not signed in.
signedInUserFullName | string | Full name of currently signed in user. Null if user is not signed in.
signedInUserEmail | string | Email of currently signed in user. Null if user is not signed in.
selectedRepresentationIndex | number | Index of currently represented organization
selectedRepresentedOrganizationId | number | Code represented organization to be included in relative urls
allRepresentations | array of strings | All represented organization names
representationsOpenedInAdminMode | array of keys from allRepresentations array | Marks representations which are opened in admin mode based by key
onSelectedRepresentationChanged | function | Function, accepting number argument 'index', which does whatever is needed for host application to change represented organization
excludedLanguageCodes | array of strings | Codes of languages that will be ignored in language selection
hideHomeMenuLink | boolean | If home link should be hidden in menu dropdown
hideRegisterNewOrganizationLink | boolean | If register new organizations link should be hidden in menu dropdown
hideIfCurrentlyRepresentingOnlyRepresentation | boolean | If represented org item should be hidden in cases when it is a single item (there is nothing to switch to)
onTopMenuItemClicked | function | Function, accepting action or button name as string and calling function action.
selectedRepresentedSyncId   |   number  |   Code represented organization sync id to be included in relative urls

# TypeheadInputComponent <TypeheadInputComponent />#

## Component props ##
Prop | Type | Description
--- | --- | ---

name | string (required) | Input name
onChange | function(values) (required) | Function for callback
emptyLabel | string (required) | Text to display when there are no options in list
disabled | boolean | Enable or disable input
options | array (required) | data to display in select options.
Options example:
```
    array[
        {id: 1, label: 'Edgaras Padegimas', 'email' => 'epadegimas@alna.lt'},
        {id: 2, label: 'Andrius Balčikonis', 'email' => 'abalcikonis@alna.lt'},
        {id: 3, label: 'Aivaras Zakarauskas', 'email' => 'azakarauskas@alna.lt'},
    ]
```
selected | array | Preselected values. Multiple if miltiple = true
Selected example when multiple = false:
```
    array[
        {id: 1, label: 'Edgaras Padegimas', 'email' => 'epadegimas@alna.lt'}
    ]
```
Selected example when multiple = true:
```
    array[
        {id: 1, label: 'Edgaras Padegimas', 'email' => 'epadegimas@alna.lt'},
        {id: 3, label: 'Aivaras Zakarauskas', 'email' => 'azakarauskas@alna.lt'},
    ]
```
multiple | boolean (default false) | Allow to select multiple options
placeholder | string | Input placeholder
maxResults | number (default 1000) | Max results to display
className | string | Custom user class

# FooterComponent <FooterComponent />#

## Component props ##
Prop | Type | Description
--- | --- | ---
selectedLanguageCode | string | Code of a selected language ('en', 'fi', 'sv' or 'et').
pushToBottom | boolean | Place footer at the bootom of the page

Note: see /example project for working example of one way how all dependencies could be included in React app with WebPack.

# Migration to v2.0.0 #
Now all css files are included in src/commonCss/common.scss.
Now v2.0.0 comes with prepared bootstrap variables to suit common css feel and look.
Some additional classes are located in src/commonCss/_main.scss file.
You must include variable and theme files in .bootstraprc file (If you are using bootstrap-loader)

bootstrapCustomizations: ~stv-utils-frontend/lib/theme-1.vars.scss
appStyles: ~stv-utils-frontend/lib/common.scss

If you are not using bootstrap-loader you must include these files after your main bootstrap scss file

## For more information or something is missing contact edgaras@techconsult.lt ##