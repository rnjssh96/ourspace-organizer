import React from 'react';
import RootState from '../redux-types';
import { connect } from 'react-redux';

interface _ReduxProps {
    /**
     * Overall rank of the spcae
     */
    rank: number;
}

interface OSRankDisplayProps extends _ReduxProps {}

class _OSRankDisplay extends React.Component<OSRankDisplayProps> {
    private _renderStar = (percentage: number) => (
        <div className="star">
            <i className="far fa-star" />
            <div className="fill" style={{ width: `${percentage * 100}%` }}>
                <i className="fas fa-star" />
            </div>
        </div>
    );

    private _renderStars = () => {
        let p,
            rtn = [];
        for (let i = 0; i < 5; i++) {
            p = this.props.rank - i;
            p = p > 1 ? 1 : p < 0 ? 0 : p;
            rtn.push(this._renderStar(p));
        }
        return rtn;
    };

    render() {
        return (
            <div id="os-rank-display">
                <p className="h1">{this.props.rank}</p>
                <div id="stars">{this._renderStars()}</div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    rank: state.currentSpace.rank,
});

const mapDispatchToProps = {};

const OSRankDisplay = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_OSRankDisplay);

export default OSRankDisplay;
