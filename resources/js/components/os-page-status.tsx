import React from 'react';

type PageStatus = 'loading' | 'information';

interface OSPageStatusProps {
    status: PageStatus;
    info?: string;
}

const OSPageStatus = (props: OSPageStatusProps) => {
    const statusDisplay = () => {
        switch (props.status) {
            case 'loading':
                return <img src="./assets/spinner.gif" />;

            case 'information':
                return (
                    <div id="info-box">
                        <p className="h1">
                            <i className="material-icons">info</i>
                        </p>
                        <p className="h6">{props.info}</p>
                    </div>
                );
        }
    };

    return <div id="os-page-status">{statusDisplay()}</div>;
};

export default OSPageStatus;
