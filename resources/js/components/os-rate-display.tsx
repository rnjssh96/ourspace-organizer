import React from 'react';

/**
 *
 *
 * OSRateDisplay props
 *
 *
 */
interface OSRateDisplayProps {
    rate: number;
}

/**
 *
 *
 * OSRateDisplay component
 *
 *
 */
export default class OSRateDisplay extends React.Component<OSRateDisplayProps> {
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
