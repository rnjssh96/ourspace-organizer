import React from 'react';

type PageStatus = 'loading';

interface OSPageStatusProps {
    status: PageStatus;
}

const OSPageStatus = (props: OSPageStatusProps) => {
    const statusDisplay = (status: PageStatus) => {
        if (status == 'loading') {
            return <img src="./assets/spinner.gif" />;
        }
    };

    return <div id="os-page-status">{statusDisplay(props.status)}</div>;
};

export default OSPageStatus;
