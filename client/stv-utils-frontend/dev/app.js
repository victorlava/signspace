import React from 'react';
import { render } from 'react-dom';
import 'font-awesome-webpack2';
import 'bootstrap-loader';
/* from 'stv-utils-frontend' in your app */
import {TopMenuComponent, FooterComponent, PhoneNumberInputComponent, TypeaheadInputComponent} from '../src/lib.js';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            langCode: 'en',
            signInUrl: '#',
            signOutUrl: '#',
            signedInUserFirstName: null,
            signedInUserLastName: null,
            signedInUserFullName: null,
            signedInUserEmail: null,
            selectedRepresentationIndex: null,
            selectedRepresentedOrganizationId: null,
            selectedRepresentedSyncId:null,
            allRepresentations: null,
            representationsOpenedInAdminMode: null,
            allOrganizationsLinkData: null
        };
    }

    onLangChanged(langCode) {
        this.setState({
            langCode: langCode
        });
    }

    onSignInClicked() {
        this.setState({
            signedInUserFirstName: 'James longggggggggggggggggggggggggggggggggg name',
            signedInUserLastName: 'Bond',
            signedInUserFullName: 'James Bond',
            signedInUserEmail: 'bond@mailinator.com',
            selectedRepresentationIndex: null,
            selectedRepresentedOrganizationId: null,
            selectedRepresentedSyncId:null,
            allRepresentations: [
                'Small construction company',
                'Medium sized construction company',
                'Big construction company',
                'Construction company with LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG NAME'
            ],
            representationsOpenedInAdminMode: [1, 3],
            allOrganizationsLinkData: {
                showLink: true,
                count: 50,
                isAdmin: false
            }
        });
    }

    onSignOutClicked() {
        this.setState({
            signedInUserFirstName: null,
            signedInUserLastName: null,
            signedInUserFullName: null,
            signedInUserEmail: null,
            selectedRepresentationIndex: null,
            selectedRepresentedOrganizationId: null,
            selectedRepresentedSyncId:null,
            allRepresentations: null,
            representationsOpenedInAdminMode: null
        });
    }

    onSelectedRepresentationChanged(index) {
        this.setState({
            selectedRepresentationIndex: index,
            selectedRepresentedOrganizationId: '' + index,
            selectedRepresentedSyncId:'' + index
        });
    }

    handlePhoneNumberInputValueChanged() {
        console.log("INPUT VALUE CHANGED");
    }

    handleTypeHead(data) {
        console.log(data);
    }

    handleonTopMenuItemClicked(data) {
        console.log(data);
    }

    onServiceLinkClicked() {}

    render() {
        let drpdownData = [
            {id: 1, label: 'Edgaras Padegimas', email: 'epadegimas@alna.lt'},
            {id: 2, label: 'Miles', email: 'miles@alna.lt'},
            {id: 3, label: 'Charles', email: 'charles@alna.lt'},
            {id: 4, label: 'Herbie', email: 'herbie@alna.lt'},
        ];

        return (
            <div className="container">
                <TopMenuComponent
                    showAnonymousUserLanguageSelector={true}
                    showAnonymousUserBackLink={true}
                    showAnonymousUserSignInLink={true}
                    showSignedInUserLanguageSelector={true}
                    showSignedInUserProfileLinks={true}
                    showSignedInUserEnviromentSelector={true}
                    showSignedInUserOrganizationMenu={true}
                    showSignedInUserOrganizationInfoLink={true}
                    showSignedInUserManageUsersLink={true}
                    showSignedInQatUserLink={true}
                    allOrganizationsLinkData={this.state.allOrganizationsLinkData}
                    selectedLanguageCode={this.state.langCode}
                    onLanguageChanged={this.onLangChanged.bind(this) }
                    onSignInClicked={this.onSignInClicked.bind(this) }
                    onSignOutClicked={this.onSignOutClicked.bind(this) }
                    signedInUserFirstName={this.state.signedInUserFirstName}
                    signedInUserLastName={this.state.signedInUserLastName}
                    signedInUserFullName={this.state.signedInUserFullName}
                    signedInUserEmail={this.state.signedInUserEmail}
                    selectedRepresentationIndex={this.state.selectedRepresentationIndex}
                    selectedRepresentedOrganizationId={this.state.selectedRepresentedOrganizationId}
                    selectedRepresentedSyncId={this.state.selectedRepresentedSyncId}
                    allRepresentations={this.state.allRepresentations}
                    representationsOpenedInAdminMode={this.state.representationsOpenedInAdminMode}
                    onSelectedRepresentationChanged={this.onSelectedRepresentationChanged.bind(this) }
                    onTopMenuItemClicked={this.handleonTopMenuItemClicked}
                    excludedLanguageCodes={['ru']}
                    hideHomeMenuLink={false}
                    hideRegisterNewOrganizationLink={false}
                />

                <nav className="stv-secondary-nav navbar navbar-toggleable-sm fixed-top" role="navigation">
                    <button
                        id="top_menu_collapse_button"
                        className="navbar-toggler navbar-toggler-right"
                        type="button"
                        data-toggle="collapse"
                        data-target="#secondary-navbar"
                        aria-controls="secondary-navbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        &#9776;
                    </button>
                    <a className="navbar-brand" href="#">&nbsp;</a>
                    <div className="collapse navbar-collapse justify-content-between" id="secondary-navbar">
                        <ul className="navbar-nav">
                            <li className="nav-item icon">
                                <a href="#" className="nav-link"><i className="fa fa-home"></i></a>
                            </li>
                            <li className="nav-item active">
                                <a href="#" className="nav-link">COMPANIES</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">PROJECTS</a>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-item icon">
                                <a href="#" className="nav-link"><i className="fa fa-question-circle"></i></a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <h1>Example style guide elements <i>(Bootstrap 4 alpha 6)</i></h1>

                <div className="card">
                    <h3 className="card-header">Spacing</h3>
                    <div className="card-block">
                        <p>General recommended spacing sizes: 2px-4px-6px-12px-24px-32px</p>
                        <p> To use this recommended spacing sizes: (m*-* is margin-*: *rem) (p*-* is padding-*: *rem)</p>
                        <ul>
                            <li>.mt-0, .mt-1, .mt-2, .mt-3, .mt-4, .mt-5, .mt-6</li>
                            <li>.mr-0, .mr-1, .mr-2, .mr-3, .mr-4, .mr-5, .mr-6</li>
                            <li>.mb-0, .mb-1, .mb-2, .mb-3, .mb-4, .mb-5, .mb-6</li>
                            <li>.ml-0, .ml-1, .ml-2, .ml-3, .ml-4, .ml-5, .ml-6</li>
                            <li>.mx-0, .mx-1, .mx-2, .mx-3, .mx-4, .mx-5, .mx-6</li>
                            <li>.my-0, .my-1, .my-2, .my-3, .my-4, .my-5, .my-6</li>
                        </ul>
                        <ul>
                            <li>.pt-0, .pt-1, .pt-2, .pt-3, .pt-4, .pt-5, .pt-6</li>
                            <li>.pr-0, .pr-1, .pr-2, .pr-3, .pr-4, .pr-5, .pr-6</li>
                            <li>.pb-0, .pb-1, .pb-2, .pb-3, .pb-4, .pb-5, .pb-6</li>
                            <li>.pl-0, .pl-1, .pl-2, .pl-3, .pl-4, .pl-5, .pl-6</li>
                            <li>.px-0, .px-1, .px-2, .px-3, .px-4, .px-5, .px-6</li>
                            <li>.py-0, .py-1, .py-2, .py-3, .py-4, .py-5, .py-6</li>
                        </ul>
                        <p>Specific rules:</p>

                        <p>Body padding 24px.</p>
                        <p>Padding within lightbox or other boxed element between border and content 32px.</p>
                        <p>
                            Typical vertical margins between elemets depending on their size 12px for small, 24px
                            for medium, 32px for lage elements (unless described differently for specific elements).
                        </p>

                        <p>Typical padding for icons:</p>

                        <p>
                            Left side icon used with text - 10px padding-right (however may be adjusted for very
                            small or very large font cases as defined by specific design case).
                        </p>
                        <p>Drop list triangle in bordered element - right aligned, 12px padding-right.</p>
                        <p>Drop list triangle in non-bordered element - 12px padding-left from text.</p>
                        <p>Stand-alone icon placed within input field (e.g. search icon) - 12px padding around.</p>
                    </div>
                </div>

                <div className="card">
                    <h3 className="card-header">Fonts</h3>
                    <div className="card-block">
                        <h1>Header 1</h1>
                        <h2>Header 2</h2>
                        <h3>Header 3</h3>
                        <h4>Header 4</h4>
                        <h4 className="text-success">Header 4</h4>
                        <h5>Header 5</h5>
                        <h6>Header 6</h6>
                        <p>
                            <big>
                                Large text (Proxima Nova Regular 18px, Margin 12px, Line height 1.5rem):
                                Contrary to popular belief, Lorem Ipsum is not
                                simply random text. It has roots in a piece of classical Latin literature
                                from 45 BC, making it over 2000 years old.
                            </big>
                        </p>
                        <p>
                            Main text (Proxima Nova Regular 16px, Margin 12px, Line height 1.5rem): Contrary to
                            popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                            classical Latin literature from 45 BC, making it over 2000 years old.
                        </p>
                        <p>
                            <small>
                                mall text (Proxima Nova Regular 14px, Margin 12px, Line height 1.5rem): Contrary
                                to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
                                of classical Latin literature from 45 BC, making it over 2000 years old.
                            </small>
                        </p>
                        <h3>Font Color Variations</h3>
                        <p className="text-main">Main (#363636) - used in most cases</p>
                        <p className="text-light">Light (#6f6f6f) - used to deemphasize text a bit (e.g. label names)</p>
                        <p className="text-very-light">Very light (#999999) - used to deemphasize text a lot (e.g. disabled state)</p>
                        <p className="text-primary">Primary light (#69be28) - only used in H4 if color heading is needed.</p>
                        <p className="text-inverse">Inverse (#ffffff) - used on dark backgrounds for good readability</p>
                        <a className="mt-6" href="http://v4-alpha.getbootstrap.com/content/typography/">More examples</a>
                    </div>
                </div>

                <div className="card">
                    <h3 className="card-header">Icons</h3>
                    <div className="card-block">
                        <p>There are 2 icon sources recommended for use:</p>
                        <ul>
                            <li>Font Awsome</li>
                            <li>Google Material Icons</li>
                        </ul>
                        <p>Incos spacing classes: (fa-m* is margin-*: 10px)</p>
                        <ul>
                            <li>.fa-mr</li>
                            <li>.fa-ml</li>
                            <li>.fa-mx</li>
                        </ul>
                    </div>
                </div>

                <div className="card">
                    <h3 className="card-header">Tabs</h3>
                    <div className="card-block">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Active</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#">Disabled</a>
                            </li>
                        </ul>
                        <a className="mt-6" href="http://v4-alpha.getbootstrap.com/components/navs/#tabs">More examples</a>
                    </div>
                </div>

                <div className="card">
                    <h3 className="card-header">Buttons</h3>
                    <div className="card-block">
                        <div className="mb-6">
                            <button role="button" type="button" className="btn btn-default">Default</button>&nbsp;
                            <button role="button" type="button" className="btn btn-primary">Primary</button>&nbsp;
                            <button role="button" type="button" className="btn btn-secondary">Secondary</button>&nbsp;
                            <button role="button" type="button" className="btn btn-success">Success</button>&nbsp;
                            <button role="button" type="button" className="btn btn-info">Info</button>&nbsp;
                            <button role="button" type="button" className="btn btn-warning">Warning</button>&nbsp;
                            <button role="button" type="button" className="btn btn-danger">Danger</button>&nbsp;
                            <button role="button"n type="button" className="btn btn-link">Link</button>&nbsp;
                            <button role="button"n type="button" className="btn btn-link">
                                <i className="fa fa-download"></i>Link
                            </button>
                        </div>
                        <div className="mb-6">
                            <button role="button" type="button" className="btn btn-default btn-sm">Default</button>&nbsp;
                            <button role="button" type="button" className="btn btn-primary btn-sm">Primary</button>&nbsp;
                            <button role="button" type="button" className="btn btn-secondary btn-sm">Secondary</button>&nbsp;
                            <button role="button" type="button" className="btn btn-success btn-sm">Success</button>&nbsp;
                            <button role="button" type="button" className="btn btn-info btn-sm">Info</button>&nbsp;
                            <button role="button" type="button" className="btn btn-warning btn-sm">Warning</button>&nbsp;
                            <button role="button" type="button" className="btn btn-danger btn-sm">Danger</button>&nbsp;
                            <button role="button" type="button" className="btn btn-link btn-sm">Link</button>&nbsp;
                        </div>
                        <div className="mb-6">
                            <button role="button" type="button" className="btn btn-default btn-lg">Default</button>&nbsp;
                            <button role="button" type="button" className="btn btn-primary btn-lg">Primary</button>&nbsp;
                            <button role="button" type="button" className="btn btn-secondary btn-lg">Secondary</button>&nbsp;
                            <button role="button" type="button" className="btn btn-success btn-lg">Success</button>&nbsp;
                            <button role="button" type="button" className="btn btn-info btn-lg">Info</button>&nbsp;
                            <button role="button" type="button" className="btn btn-warning btn-lg">Warning</button>&nbsp;
                            <button role="button" type="button" className="btn btn-danger btn-lg">Danger</button>&nbsp;
                            <button role="button" type="button" className="btn btn-link btn-lg">Link</button>&nbsp;
                        </div>
                        <div className="mb-6">
                            <button role="button" type="button" className="btn btn-outline-default">Default</button>&nbsp;
                            <button role="button" type="button" className="btn btn-outline-primary">Primary</button>&nbsp;
                            <button role="button" type="button" className="btn btn-outline-secondary">Secondary</button>&nbsp;
                            <button role="button" type="button" className="btn btn-outline-success">Success</button>&nbsp;
                            <button role="button" type="button" className="btn btn-outline-info">Info</button>&nbsp;
                            <button role="button" type="button" className="btn btn-outline-warning">Warning</button>&nbsp;
                            <button role="button" type="button" className="btn btn-outline-danger">Danger</button>&nbsp;
                        </div>
                        <a className="mt-6" href="https://v4-alpha.getbootstrap.com/components/buttons/">More examples</a>
                    </div>
                </div>
                <div className="card">
                    <h3 className="card-header">Forms</h3>
                    <div className="card-block">
                        <form>
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label className="form-control-label">Input group</label>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Recipient's username" aria-describedby="basic-addon2" />
                                    <span className="input-group-addon bg-white" id="basic-addon2">@example.com</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-control-label">Input group</label>
                                <div className="input-group">
                                    <span className="input-group-addon bg-white" id="basic-addon1">
                                        <i className="fa fa-home"></i>
                                    </span>
                                    <select className="form-control" id="basic-addon1">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-control-label">Input group</label>
                                <div className="input-group">
                                    <span className="input-group-addon bg-white" id="basic-addon3">&euro;</span>
                                    <input type="text" className="form-control" placeholder="Recipient's username" aria-describedby="basic-addon3" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-control-label" htmlFor="exampleSelect1">Example select</label>
                                <select className="form-control" id="exampleSelect1">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-control-label d-block">Custom file upload</label>
                                <label className="custom-file">
                                    <input type="file" id="file" className="custom-file-input" />
                                    <span className="custom-file-control">
                                        <i className="fa fa-cloud-upload drag-icon"></i>
                                        {/* Text must be wrapped with span */}
                                        <span>Drag and drop file here or <a href="#"><i className="fa-pr fa fa-paperclip i-menu"></i>Attach file</a></span>
                                    </span>
                                </label>
                            </div>
                            <div className="form-group">
                                <label className="form-control-label d-block">Custom checkbox</label>
                                <label className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" />
                                    <span className="custom-control-indicator"></span>
                                    <span className="custom-control-description">Check this custom checkbox</span>
                                </label>
                            </div>
                            <div className="form-group">
                                <label className="form-control-label d-block">Custom radio</label>
                                <label className="custom-control custom-radio">
                                    <input id="radio1" name="radio" type="radio" className="custom-control-input" />
                                    <span className="custom-control-indicator"></span>
                                    <span className="custom-control-description">Toggle this custom radio</span>
                                </label>
                                <br />
                                <label className="custom-control custom-radio">
                                    <input id="radio1" name="radio" type="radio" className="custom-control-input" />
                                    <span className="custom-control-indicator"></span>
                                    <span className="custom-control-description">Toggle this custom radio</span>
                                </label>
                            </div>
                            <div className="form-group">
                                <label className="form-control-label">Dropdown with search</label>
                                <TypeaheadInputComponent
                                    name='competence-type-select'
                                    onChange={this.handleTypeHead}
                                    disabled={false}
                                    options={drpdownData}
                                    multiple={false}
                                    selected={[{id: 1, label: 'Edgaras Padegimas', email: 'epadegimas@alna.lt'}]}
                                    emptyLabel='List is empty'
                                    placeholder='Placeholder'
                                    maxResults={1000}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-control-label">Input with phone numer validator</label>
                                <PhoneNumberInputComponent
                                    id="phone_input"
                                    className="form-control input-control"
                                    initialCountry="fi"
                                    onChange={this.handlePhoneNumberInputValueChanged}
                                    preferredCountries={['fi', 'ee', 'se']}
                                />
                            </div>
                            <button role="button" type="submit" className="btn btn-primary">Submit</button>
                        </form>
                        <a className="mt-6" href="https://v4-alpha.getbootstrap.com/components/forms/">More examples</a>
                    </div>
                </div>
                <div className="card">
                    <h3 className="card-header">Table</h3>
                    <div className="card-block">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                        <a className="mt-6" href="http://v4-alpha.getbootstrap.com/content/tables/">More examples</a>
                    </div>
                </div>
                <div className="card">
                    <h3 className="card-header">Search boxes</h3>
                    <div className="card-block">

                        <div className="card card-default mb-0">
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-group">
                                            <input id="users_list_filter_input" type="text" className="form-control" placeholder="Name, e-mail or permission" />
                                            <span className="input-group-addon text-primary bg-white">
                                                <i id="filter-icon" className="fa fa-search" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <div className="dropdown">
                                            <button role="button" className="btn btn-default dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Dropdown button
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item" href="#">Action</a>
                                                <a className="dropdown-item" href="#">Another action</a>
                                                <a className="dropdown-item" href="#">Something else here</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className="pull-right mt-2" href="#">
                            <i className="fa fa-trash-o fa-mr"></i> Clear filters
                        </a>
                        <div className="clearfix mb-6"></div>

                        <div className="card card-primary mb-0">
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="input-group">
                                            <input id="users_list_filter_input" type="text" className="form-control" placeholder="Name, e-mail or permission" />
                                            <span className="input-group-addon text-primary bg-white">
                                                <i id="filter-icon" className="fa fa-search" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <div className="dropdown">
                                            <button role="button" className="btn btn-default dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Dropdown button
                                            </button>
                                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item" href="#">Action</a>
                                                <a className="dropdown-item" href="#">Another action</a>
                                                <a className="dropdown-item" href="#">Something else here</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className="pull-right mt-2" href="#">
                            <i className="fa fa-trash-o fa-mr"></i> Clear filters
                        </a>
                        <div className="clearfix mb-6"></div>

                        <a className="mt-6" href="http://v4-alpha.getbootstrap.com/content/tables/">More examples</a>
                    </div>
                </div>
                <div className="card">
                    <h3 className="card-header">Labels (Now badges)</h3>
                    <div className="card-block">
                        <span className="badge badge-default">DEFAULT</span>&nbsp;
                        <span className="badge badge-primary">PRIMARY</span>&nbsp;
                        <span className="badge badge-success">SUCCESS</span>&nbsp;
                        <span className="badge badge-info">INFO</span>&nbsp;
                        <span className="badge badge-warning">WARNING</span>&nbsp;
                        <span className="badge badge-danger hover">DANGER <a href="#"><i className="fa fa-times fa-ml"></i></a></span>&nbsp;
                        <span className="badge badge-white hover">WHITE <a href="#"><i className="fa fa-times fa-ml"></i></a></span>
                        <br />
                        <a className="mt-6" href="https://v4-alpha.getbootstrap.com/components/badge/">More examples</a>
                    </div>
                </div>
                <div className="card">
                    <h3 className="card-header">Lightbox/Modal</h3>
                    <div className="card-block">
                        <button role="button" type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                            Launch demo modal
                        </button>

                        <div
                            className="modal fade"
                            id="exampleModal"
                            tabIndex="-1"
                            role="dialog"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h2 className="modal-title" id="exampleModalLabel">Modal title</h2>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        BODY
                                    </div>
                                    <div className="modal-footer">
                                        <button role="button" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button role="button" type="button" className="btn btn-primary">Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <a className="mt-6" href="http://v4-alpha.getbootstrap.com/components/modal/">More examples</a>
                    </div>
                </div>
                <div className="card">
                    <h3 className="card-header">Notifications/Alerts</h3>
                    <div className="card-block">
                        <div className="alert alert-success" role="alert">
                            <i className="fa fa-check fa-mr  align-middle" aria-hidden="true"></i>
                            <strong>Well done!</strong> You successfully read this important alert message.
                        </div>
                        <div className="alert alert-info" role="alert">
                            <i className="fa fa-info-circle fa-mr  align-middle" aria-hidden="true"></i>
                            <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
                        </div>
                        <div className="alert alert-warning" role="alert">
                            <i className="fa fa-info-circle fa-mr  align-middle" aria-hidden="true"></i>
                            <strong>Warning!</strong> Better check yourself, you're not looking too good.
                        </div>
                        <div className="alert alert-danger" role="alert">
                            <i className="fa fa-exclamation-circle fa-mr  align-middle" aria-hidden="true"></i>
                            <strong>Oh snap!</strong> Change a few things up and try submitting again.
                        </div>
                        <a className="mt-6" href="https://v4-alpha.getbootstrap.com/content/tables/">More examples</a>
                    </div>
                </div>
                <div className="card">
                    <h3 className="card-header">Progress bar</h3>
                    <div className="card-block">
                        <div className="progress">
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{width: '25%'}}
                                aria-valuenow="25"
                                aria-valuemin="0"
                                aria-valuemax="100"
                            >25%</div>
                        </div>
                        <a className="mt-6" href="https://v4-alpha.getbootstrap.com/components/progress/">More examples</a>
                    </div>
                </div>
                <div className="card">
                    <h3 className="card-header">Loading indicator</h3>
                    <div className="card-block">
                        To use loading indicator place div with <strong>.page-loading-indicator</strong> class.
                    </div>
                </div>


                <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                        sunt explicabo.Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                        consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.Neque porro quisquam est, qui
                        dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
                        incidunt ut labore et dolore magnam aliquam quaerat voluptatem.Ut enim ad minima veniam, quis nostrum
                        exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?Quis autem
                        vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui
                        dolorem eum fugiat quo voluptas nulla pariatur?
                </p>
                <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                        sunt explicabo.Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                        consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.Neque porro quisquam est, qui
                        dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
                        incidunt ut labore et dolore magnam aliquam quaerat voluptatem.Ut enim ad minima veniam, quis nostrum
                        exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?Quis autem
                        vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui
                        dolorem eum fugiat quo voluptas nulla pariatur?
                </p>
                <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                        sunt explicabo.Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                        consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.Neque porro quisquam est, qui
                        dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
                        incidunt ut labore et dolore magnam aliquam quaerat voluptatem.Ut enim ad minima veniam, quis nostrum
                        exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?Quis autem
                        vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui
                        dolorem eum fugiat quo voluptas nulla pariatur?
                </p>
                <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                        sunt explicabo.Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                        consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.Neque porro quisquam est, qui
                        dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
                        incidunt ut labore et dolore magnam aliquam quaerat voluptatem.Ut enim ad minima veniam, quis nostrum
                        exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?Quis autem
                        vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui
                        dolorem eum fugiat quo voluptas nulla pariatur?
                </p>
                <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                        sunt explicabo.Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                        consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.Neque porro quisquam est, qui
                        dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
                        incidunt ut labore et dolore magnam aliquam quaerat voluptatem.Ut enim ad minima veniam, quis nostrum
                        exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?Quis autem
                        vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui
                        dolorem eum fugiat quo voluptas nulla pariatur?
                </p>
                <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                        totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
                        sunt explicabo.Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                        consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.Neque porro quisquam est, qui
                        dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
                        incidunt ut labore et dolore magnam aliquam quaerat voluptatem.Ut enim ad minima veniam, quis nostrum
                        exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?Quis autem
                        vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui
                        dolorem eum fugiat quo voluptas nulla pariatur?
                </p>

                <FooterComponent selectedLanguageCode={this.state.langCode} pushToBottom={true} />
            </div>
        )
    }
}


render(<App />, document.getElementById('container'))
