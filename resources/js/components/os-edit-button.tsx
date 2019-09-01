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
     * Text to be displayed (by default ```Edit```)
     */
    text?: string;

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
                <p className="h6">
                    {this.props.text ? this.props.text : 'Edit'}
                </p>
            </a>
        );
    }
}
