/**
 *
 *
 * OSHomeScreen props
 *
 *
 */
interface OSHomeContainerProps extends _ReduxProps {}

/**
 *
 *
 * OSHomeScreen component
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

class _OSHomeScreen extends React.Component<OSHomeContainerProps> {
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
                            <SpaceList />
                        </div>
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

interface _ReduxProps {
    /**
     * Logged status
     */
    loginStatus: LoginStatus;

    /**
     * Current user
     */
    currentUser?: Organizer;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    loginStatus: state.auth.loginStatus,
    currentUser: state.auth.currentUser,
});

const OSHomeScreen = connect(mapStateToProps)(_OSHomeScreen);

export default OSHomeScreen;
