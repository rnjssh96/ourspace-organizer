import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Redirect } from 'react-router';

import RootState from '../redux-types';
import { LoggedStatus } from '../redux-types/auth';

import HomeHeader from './home-header';
import HomeSpacesTab from './home-spaces-tab';
import HomeMainView from './home-main-view';

interface _ReduxProps {
    /**
     * Logged status
     */
    loggedStatus: LoggedStatus;
}

interface OSHomeContainerProps
    extends _ReduxProps,
        RouteComponentProps<{ userid: string }> {}

class _OSHomeContainer extends React.Component<OSHomeContainerProps> {
    render() {
        if (this.props.loggedStatus === 'success')
            return (
                <div id="os-home-container" className="container-fluid">
                    <HomeHeader />
                    <div id="body" className="row">
                        <div id="spaces-tab">
                            <HomeSpacesTab />
                        </div>
                        <div id="main-view">
                            <HomeMainView />
                        </div>
                    </div>
                </div>
            );
        else return <Redirect to="/" />;
    }
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    loggedStatus: state.auth.loggedStatus,
});

const OSHomeContainer = connect(mapStateToProps)(_OSHomeContainer);

export default OSHomeContainer;
