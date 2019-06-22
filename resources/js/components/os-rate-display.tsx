import React from 'react';

/**
 *
 *
 * OSRateDisplay props
 *
 *
 */
interface OSRateDisplayProps extends _ReduxProps {}

/**
 *
 *
 * OSRateDisplay component
 *
 *
 */
class _OSRateDisplay extends React.Component<OSRateDisplayProps> {
    private _renderStar = (index: number, percentage: number) => (
        <div key={index} className="star">
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
            p = this.props.rate - i;
            p = p > 1 ? 1 : p < 0 ? 0 : p;
            rtn.push(this._renderStar(i, p));
        }
        return rtn;
    };

    private _renderRate = () => {
        return <p id="rate">{this.props.rate.toFixed(2)}</p>;
    };

    render() {
        return (
            <div id="os-rate-display">
                {this._renderRate()}
                <div id="stars">{this._renderStars()}</div>
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

interface _ReduxProps {
    /**
     * Overall rank of the spcae
     */
    rate: number;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    rate: (state.currentSpace.data && state.currentSpace.data.rank) || 0,
});

const mapDispatchToProps = {};

const OSRateDisplay = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_OSRateDisplay);

export default OSRateDisplay;
