import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {observer, inject} from 'mobx-react';
import {computed} from 'mobx';
import './styles.scss';


@inject('stores')
@observer
export class Message extends Component {

    static propTypes = {
        activity: PropTypes.object.isRequired,
    }

    @computed get isLoading() {
        const {caseStore, activityStore, documentStore} = this.props.stores;
        if (caseStore.isLoading || activityStore.isLoading || documentStore.isLoading) {
            return true;
        }
        return false;
    }

    render() {
        const {activity} = this.props;
        console.log(activity);

        if (this.isLoading) {
            return <div>Loading</div>;
        }
        return (
            <div styleName="root"> 
                <div className="row">
                    <div className="col-1">
                        { /* TODO: profile image */ }
                        <div className="profile-image"></div>
                    </div> 
                    <div className="col-11">
                        <div styleName="title">
                            <p>
                                <span styleName="name">
                                    <Link to="#">
                                        <i className="fa fa fa-user-circle-o"></i> {activity.sent_from}
                                    </Link>
                                    <i className="fa fa-long-arrow-right"></i>
                                    <Link to="#">
                                        {activity.to.length} people
                                    </Link>  
                                </span>
                                <small styleName="date">
                                    { /* TODO: wrong date format, should be 2017.02.15 15:00 */}
                                    <time dateTime={activity.created}>{activity.created.slice(0, 10)}</time>
                                    <i className="fa fa-unlock"></i>
                                </small>
                            </p>
                        </div>
                        <div styleName="text">
                            <p>{activity.text}</p>
                        </div>
                        <If condition={activity.attachments} >
                            <For each="attachment_id" of={activity.attachments}>
                                <div styleName="attachment" key={attachment_id}>
                                    <div>
                                        <Link to={'/api/v1/document/' + attachment_id} target="_blank">
                                            <i className="fa fa-file-word-o"></i>
                                            {this.props.stores.documentStore.objects.filter((obj) => obj.id === attachment_id)[0].filename}
                                        </Link>
                                        <Link styleName="gear" className="icon" to="#">
                                            <i className="fa fa-gear"></i>
                                        </Link>
                                    </div>
                                </div>
                            </For>
                        </If>
                    </div>
                </div>
            </div>
        );
    }

}
