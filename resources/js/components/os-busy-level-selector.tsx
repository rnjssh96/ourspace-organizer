import React from 'react';

export default class OSBusyLevelSelector extends React.Component {
    render() {
        return (
            <div id="os-busy-level-selector">
                <p className="h3">
                    <b>바쁨</b>
                </p>
                <div id="buttons">
                    <button className="selected">
                        <p className="h6">바쁨</p>
                    </button>
                    <button>
                        <p className="h6">보통</p>
                    </button>
                    <button>
                        <p className="h6">여유</p>
                    </button>
                </div>
            </div>
        );
    }
}
