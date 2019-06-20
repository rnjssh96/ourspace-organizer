import React from 'react';

import OSPageStatus from '../components/os-page-status';

/**
 *
 *
 * LoginForm props
 *
 *
 */
interface LoginFormProps extends _ReduxProps, _ReduxActionCreators {}

/**
 *
 *
 * LoginForm component
 *
 *
 */
class _LoginForm extends React.Component<LoginFormProps> {
    state = {
        userEmail: '',
        userPassword: '',
    };

    private _onLogin = (ev: React.MouseEvent) => {
        ev.preventDefault();
        this.props.requestLogin(this.state.userEmail, this.state.userPassword);
    };

    private _renderForm = () => {
        if (this.props.loginStatus.status === 'processing') {
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
                    {this.props.loginStatus.status === 'failed' &&
                        this.props.loginStatus.message && (
                            <p id="failed-message" className="h6">
                                {this.props.loginStatus.message}
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

/**
 *
 *
 * Connect redux
 *
 *
 */
import { connect } from 'react-redux';
import RootState from '../redux-types';

import { LoginStatus } from '../model/system';

import { requestLogin } from '../thunk-action/auth';

interface _ReduxProps {
    /**
     * Login status
     */
    loginStatus: LoginStatus;
}

interface _ReduxActionCreators {
    /**
     * Request login
     */
    requestLogin: (userEmail: string, userPassword: string) => void;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    loginStatus: state.auth.loginStatus,
});

const mapDispatchToProps = {
    requestLogin,
};

const LoginForm = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_LoginForm);

export default LoginForm;
