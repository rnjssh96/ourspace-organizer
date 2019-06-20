import React from 'react';
import { Redirect } from 'react-router';

import HomeHeader from './home-header';
import HomeSpacesTab from './home-spaces-tab';
import HomeMainView from './home-main-view';

/**
 *
 *
 * OSHomeContainer props
 *
 *
 */
interface OSHomeContainerProps extends _ReduxProps {}

/**
 *
 *
 * OSHomeContainer component
 *
 *
 */
class _OSHomeContainer extends React.Component<OSHomeContainerProps> {
    render() {
        if (this.props.loginStatus.status === 'succeed')
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

interface _ReduxProps {
    /**
     * Logged status
     */
    loginStatus: LoginStatus;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    loginStatus: state.auth.loginStatus,
});

const OSHomeContainer = connect(mapStateToProps)(_OSHomeContainer);

export default OSHomeContainer;
