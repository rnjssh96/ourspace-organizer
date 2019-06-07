import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Redirect } from 'react-router';

import RootState from '../redux-types';
import { LoggedStatus, OSUser } from '../redux-types/auth';

import LoginBox from './login-box';

interface _ReduxProps {
    /**
     * Logged status
     */
    loggedStatus: LoggedStatus;

    /**
     * Current user
     */
    currentUser?: OSUser;
}

interface OSLoginContainerProps extends _ReduxProps, RouteComponentProps {}

class _OSLoginContainer extends React.Component<OSLoginContainerProps> {
    render() {
        if (this.props.loggedStatus === 'success' && this.props.currentUser)
            return <Redirect to={`/${this.props.currentUser.uid}`} />;
        else
            return (
                <div id="os-login-container" className="container-fluid">
                    <LoginBox />
                </div>
            );
    }
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    loggedStatus: state.auth.loggedStatus,
    currentUser: state.auth.currentUser,
});

const OSLoginContainer = connect(mapStateToProps)(_OSLoginContainer);

export default OSLoginContainer;
