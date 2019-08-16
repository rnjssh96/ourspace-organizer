/**
 *
 *
 * OpeningHours props
 *
 *
 */
interface OpeningHoursProps extends _ReduxProps {}

/**
 *
 *
 * OpeningHours component
 *
 *
 */
import React from 'react';

import OSEditButton from './os-edit-button';

class _OpeningHours extends React.Component<OpeningHoursProps> {
    render() {
        return (
            <div id="location-map" className="category">
                <div className="header">
                    <p className="h5">운영시간</p>
                    <OSEditButton onClick={() => {}} />
                </div>
                <div className="body" />
            </div>
        );
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

import { OpeningHours } from '../model/space';

interface _ReduxProps {
    /**
     * Operating hours and days
     */
    openingHours?: OpeningHours;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    openingHours:
        state.currentSpace.data && state.currentSpace.data.openingHours,
});

const mapDispatchToProps = {};

const OpeningHours = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_OpeningHours);

export default OpeningHours;
