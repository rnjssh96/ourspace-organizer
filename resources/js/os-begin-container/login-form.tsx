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

interface LoginFormProps extends _ReduxProps, _ReduxActionCreators {}

class _LoginForm extends React.Component<LoginFormProps> {
    state = {
        userEmail: '',
        userPassword: '',
    };

    private _onLogin = (ev: React.MouseEvent) => {
        ev.preventDefault();
        this.props.attemptLogIn(this.state.userEmail, this.state.userPassword);
    };

    private _renderForm = () => {
        if (this.props.loggedStatus === 'processing') {
            return <OSPageStatus status="loading" />;
        } else {
            return (
                <form>
                    <div className="form-group">
                        <label>이메일</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="이메일을 입력하세요."
                            value={this.state.userEmail}
                            onChange={ev => {
                                this.setState({
                                    ...this.state,
                                    userEmail: ev.target.value,
                                });
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="비밀번호"
                            value={this.state.userPassword}
                            onChange={ev => {
                                this.setState({
                                    ...this.state,
                                    userPassword: ev.target.value,
                                });
                            }}
                        />
                    </div>
                    <button
                        id="login-button"
                        className="btn btn-block btn-primary"
                        onClick={this._onLogin}
                    >
                        로그인
                    </button>
                    {this.props.loggedStatus === 'failed' && (
                        <p id="failed-message" className="h6">
                            존재하지 않는 사용자입니다.
                        </p>
                    )}
                </form>
            );
        }
    };

    render() {
        return <div id="login-form">{this._renderForm()}</div>;
    }
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    loggedStatus: state.auth.loggedStatus,
});

const mapDispatchToProps = {
    attemptLogIn,
};

const LoginForm = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_LoginForm);

export default LoginForm;
