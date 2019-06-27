/**
 *
 *
 * HomeScreen props
 *
 *
 */
interface HomeScreenProps extends _ReduxProps {}

/**
 *
 *
 * HomeScreen component
 *
 *
 */
import React from 'react';
import { Redirect } from 'react-router';

import SpaceList from '../components/space-list';

import GeneralInfo from '../components/general-info';
import SpaceDescription from '../components/space-description';
import AmenityTags from '../components/amenity-tags';
import LoactionMap from '../components/loaction-map';
import ImagesEditor from '../components/images-editor';

class _HomeScreen extends React.Component<HomeScreenProps> {
    private _renderWorkspace = () => {
        if (this.props.currentSpace) {
            return (
                <div id="workspace">
                    <div id="left">
                        <GeneralInfo />
                        <SpaceDescription />
                        <AmenityTags />
                        <LoactionMap />
                    </div>
                    <div id="right">
                        <ImagesEditor />
                    </div>
                </div>
            );
        } else {
            return (
                <div id="workspace">
                    <OSPageStatus
                        status="information"
                        info="스페이스를 선택해 주세요."
                    />
                </div>
            );
        }
    };

    render() {
        //
        // if login is succeed and current user is assigned
        //
        if (
            this.props.loginStatus.status === 'succeed' &&
            this.props.currentUser
        )
            return (
                <div id="home-container" className="container-fluid">
                    <div id="home-header">
                        <div id="title-div" />
                        <div id="profile-div" />
                    </div>
                    <div id="home-body">
                        <div id="space-menu">
                            {this.props.currentUser.authority === 'Admin' ? (
                                <SpaceList />
                            ) : (
                                <SpaceList />
                            )}
                        </div>
                        {this._renderWorkspace()}
                    </div>
                </div>
            );
        //
        // otherwise
        //
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
import Organizer from '../model/organizer';
import Space from '../model/space';
import OSPageStatus from '../components/os-page-status';

interface _ReduxProps {
    /**
     * Logged status
     */
    loginStatus: LoginStatus;

    /**
     * Current user
     */
    currentUser?: Organizer;

    /**
     * Current space
     */
    currentSpace?: Space;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    loginStatus: state.auth.loginStatus,
    currentUser: state.auth.currentUser,
    currentSpace: state.currentSpace.data,
});

const HomeScreen = connect(mapStateToProps)(_HomeScreen);

export default HomeScreen;
