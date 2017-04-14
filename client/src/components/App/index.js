import DevTools from 'mobx-react-devtools';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {observer, Provider} from 'mobx-react';

import {Home} from './Home';
import {Activities} from './Activities';
import {Documents} from './Documents';
import {Tasks} from './Tasks';
import {Login} from './Login';


const history = createHistory();


@observer
export class App extends Component {

    static propTypes = {
        stores: PropTypes.object.isRequired,
    }

    render() {
        return (
            <Provider stores={this.props.stores} history={history}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/activities" component={Activities} />
                        <Route path="/documents" component={Documents} />
                        <Route path="/tasks" component={Tasks} />
                        <Route path="/login" component={Login} />
                        <DevTools />
                    </Switch>
                </Router>
            </Provider>
        );
    }

}
