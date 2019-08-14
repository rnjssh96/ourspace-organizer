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
import OSPageStatus from '../components/os-page-status';
import SpaceSearch from '../components/space-search';
import OpeningHours from '../components/opening-hours';

class _HomeScreen extends React.Component<HomeScreenProps> {
    private _renderTitle = () => {
        if (this.props.currentUser) {
            return (
                <div id="title-div">
                    <p className="h1">
                        <b>{`${this.props.currentUser.name} 님,`}</b>
                    </p>
                    <p className="h2">{`현재 ${
                        this.props.currentUser.owningSpaces.length
                    } 개의 공간을 가지고 계십니다.`}</p>
                </div>
            );
        }
    };

    private _renderWorkspace = () => {
        if (this.props.currentSpace) {
            return (
                <div id="workspace">
                    <div id="left">
                        <GeneralInfo />
                        <SpaceDescription />
                        <OpeningHours />
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
                        {this._renderTitle()}
                        <div id="profile-div" />
                    </div>
                    <div id="home-body">
                        <div id="space-menu">
                            {this.props.currentUser.authority === 'admin' ? (
                                <SpaceSearch />
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
