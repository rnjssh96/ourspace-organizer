import React from 'react';

/**
 *
 *
 * OSEditButton props
 *
 *
 */
interface OSEditButtonProps {
    /**
     * Modal ID
     */
    modalID?: string;

    /**
     * onClick
     */
    onClick?: ([...args]: any) => any;
}

/**
 *
 *
 * OSEditButton component
 *
 *
 */
export default class OSEditButton extends React.Component<OSEditButtonProps> {
    render() {
        return (
            <a
                id="os-edit-button"
                data-toggle={this.props.modalID ? 'modal' : null}
                data-target={
                    this.props.modalID ? `#${this.props.modalID}` : null
                }
                onClick={this.props.onClick}
            >
                <p className="h6">Edit</p>
            </a>
        );
    }
}
