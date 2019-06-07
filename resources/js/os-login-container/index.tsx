import React from 'react';
import { RouteComponentProps } from 'react-router';

export default class OSLoginContainer extends React.Component<
    RouteComponentProps
> {
    private _onLogin = (ev: React.MouseEvent) => {
        ev.preventDefault();
        this.props.history.push('/test');
    };

    render() {
        return (
            <div id="os-login-container" className="container-fluid">
                <div id="login-box">
                    <div id="title">
                        <img id="logo" src="./assets/os_logo.png" />
                        <div id="title-text">
                            <p className="h3">환영합니다</p>
                            <p className="h5">Organizer Page</p>
                        </div>
                    </div>
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
                </div>
            </div>
        );
    }
}
