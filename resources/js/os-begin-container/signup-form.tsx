import React from 'react';

import OSPageStatus from '../components/os-page-status';

/**
 *
 *
 * SignupForm props
 *
 *
 */
interface SignupFormProps extends _ReduxProps, _ReduxActionCreators {}

/**
 *
 *
 * SignupForm component
 *
 *
 */
class _SignupForm extends React.Component<SignupFormProps> {
    state = {
        userEmail: '',
        userName: '',
        userPassword: '',
        userPasswordConfirm: '',
    };

    private _onSubmit = (ev: React.MouseEvent) => {
        ev.preventDefault();
        this.props.requestSignup(
            this.state.userEmail,
            this.state.userName,
            this.state.userPassword,
        );
    };

    private _renderForm = () => {
        if (this.props.signupStatus.status === 'processing') {
            return <OSPageStatus status="loading" />;
        } else if (this.props.signupStatus.status === 'succeed') {
            return (
                <OSPageStatus
                    status="success"
                    info="회원가입이 성공적으로 완료되었습니다."
                />
            );
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
                        <label>개인/단체 이름</label>
                        <input
                            className="form-control"
                            placeholder="사용자 이름을 입력하세요."
                            value={this.state.userName}
                            onChange={ev => {
                                this.setState({
                                    ...this.state,
                                    userName: ev.target.value,
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
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="비밀번호 확인"
                            value={this.state.userPasswordConfirm}
                            onChange={ev => {
                                this.setState({
                                    ...this.state,
                                    userPasswordConfirm: ev.target.value,
                                });
                            }}
                        />
                    </div>
                    <button
                        id="login-button"
                        className="btn btn-block btn-primary"
                        onClick={this._onSubmit}
                    >
                        회원가입
                    </button>
                </form>
            );
        }
    };

    render() {
        return <div id="signup-form">{this._renderForm()}</div>;
    }
}

/**
 *
 *
 * Connect redux
 *
 *
 */
import RootState from '../redux-types';
import { connect } from 'react-redux';

import { SignupStatus } from '../model/system';

import { requestSignup } from '../thunk-action/auth';

interface _ReduxProps {
    /**
     * Signup status
     */
    signupStatus: SignupStatus;
}

interface _ReduxActionCreators {
    /**
     * Request signup
     */
    requestSignup: (
        userEmail: string,
        userName: string,
        userPassword: string,
    ) => void;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    signupStatus: state.auth.signupStatus,
});

const mapDispatchToProps = {
    requestSignup,
};

const SignupForm = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_SignupForm);

export default SignupForm;
