import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import RootState from '../redux-types';
import { LoggedStatus, OSUser } from '../redux-types/auth';

import LoginForm from './login-form';
import SignupForm from './signup-form';

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

interface OSBeginContainerProps extends _ReduxProps {}

class _OSBeginContainer extends React.Component<OSBeginContainerProps> {
    state = {
        currentView: 'login',
    };

    private _renderButtonGroup = () => {
        return (
            <div id="button-group">
                <a
                    className={`${
                        this.state.currentView === 'login' ? 'active' : ''
                    }`}
                    onClick={() => {
                        this.setState({ currentView: 'login' });
                    }}
                >
                    <p className="h6">로그인</p>
                </a>
                <a
                    className={`${
                        this.state.currentView === 'signup' ? 'active' : ''
                    }`}
                    onClick={() => {
                        this.setState({
                            currentView: 'signup',
                        });
                    }}
                >
                    <p className="h6">회원가입</p>
                </a>
            </div>
        );
    };

    render() {
        if (this.props.loggedStatus === 'success' && this.props.currentUser) {
            console.log(this.props.currentUser);
            return <Redirect to={`/${this.props.currentUser.uid}`} />;
        } else
            return (
                <div id="os-begin-container" className="container-fluid">
                    <div id="center-box">
                        <div id="header">
                            <img id="logo" src="./assets/os_logo.png" />
                            <div id="title-text">
                                <p className="h3">환영합니다</p>
                                <p className="h5">Organizer Page</p>
                            </div>
                        </div>
                        <div id="body">
                            {this._renderButtonGroup()}
                            {this.state.currentView === 'login' && (
                                <LoginForm />
                            )}
                            {this.state.currentView === 'signup' && (
                                <SignupForm />
                            )}
                        </div>
                    </div>
                </div>
            );
    }
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    loggedStatus: state.auth.loggedStatus,
    currentUser: state.auth.currentUser,
});

const OSBeginContainer = connect(mapStateToProps)(_OSBeginContainer);

export default OSBeginContainer;
