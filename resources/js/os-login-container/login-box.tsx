import React from 'react';
import { connect } from 'react-redux';

import RootState from '../redux-types';
import { LoggedStatus } from '../redux-types/auth';
import { AttemptLogInAction } from '../redux-types/firebase-auth';

import { attemptLogIn } from '../actions/firebase-auth';
import OSPageStatus from '../components/os-page-status';

interface _ReduxProps {
    /**
     * Logged status
     */
    loggedStatus: LoggedStatus;
}

interface _ReduxActionCreators {
    /**
     * Attempt log in
     */
    attemptLogIn: AttemptLogInAction;
}

interface LoginBoxProps extends _ReduxProps, _ReduxActionCreators {}

class _LoginBox extends React.Component<LoginBoxProps> {
    private _onLogin = (ev: React.MouseEvent) => {
        ev.preventDefault();
        this.props.attemptLogIn('email', 'password');
    };

    private _renderForm = () => {
        if (this.props.loggedStatus === 'ready') {
            return (
                <form>
                    <div className="form-group">
                        <label>이메일</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="이메일을 입력하세요."
                        />
                    </div>
                    <div className="form-group">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="비밀번호"
                        />
                    </div>
                    <button
                        id="login-button"
                        className="btn btn-block btn-primary"
                        onClick={this._onLogin}
                    >
                        로그인
                    </button>
                </form>
            );
        } else if (this.props.loggedStatus === 'processing') {
            return <OSPageStatus status="loading" />;
        } else if (this.props.loggedStatus === 'failed') {
        }
    };

    render() {
        return (
            <div id="login-box">
                <div id="title">
                    <img id="logo" src="./assets/os_logo.png" />
                    <div id="title-text">
                        <p className="h3">환영합니다</p>
                        <p className="h5">Organizer Page</p>
                    </div>
                </div>
                <div id="login-form">{this._renderForm()}</div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    loggedStatus: state.auth.loggedStatus,
});

const mapDispatchToProps = {
    attemptLogIn,
};

const LoginBox = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_LoginBox);

export default LoginBox;
