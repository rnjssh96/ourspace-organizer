import React from 'react';

import {
    AmenityTag,
    amenities,
    interpretAmenity,
    interpretedAmentiy,
} from '../../model/space';

export const AmenitiesEditModalID = 'amenities-edit-modal';

const COL_PER_ROW = 4;
const tags = Object.keys(amenities) as AmenityTag[];

type amenityTuple = {
    key: AmenityTag;
    value: interpretedAmentiy;
};

interface AmenitiesEditModalProps {
    /**
     * Amenity tags of the space
     */
    amenityTags: AmenityTag[];
}

export default class AmenitiesEditModal extends React.Component<
    AmenitiesEditModalProps
> {
    state: { [tag in AmenityTag]?: boolean } = {};

    private _amenityTableStructure: amenityTuple[][] = [];

    componentWillMount() {
        let initialState: { [tag in AmenityTag]?: boolean } = {};
        let row: amenityTuple[];
        let col: number;
        tags.map((tag: AmenityTag, index: number) => {
            initialState[tag] = this.props.amenityTags.includes(tag);
            col = index % COL_PER_ROW;
            if (col == 0) {
                row = [];
            }
            row.push({
                key: tag,
                value: interpretAmenity(tag, 'ko'),
            });
            if (col == COL_PER_ROW - 1 || index == tags.length - 1) {
                this._amenityTableStructure.push(row);
            }
        });
        this.setState(initialState);
    }

    private _toggleTag = (tag: AmenityTag) => {
        this.setState({ ...this.state, [tag]: !this.state[tag] });
    };

    private _renderTable = () => {
        const renderColumn = (col: {
            key: AmenityTag;
            value: interpretedAmentiy;
        }) => (
            <td key={col.key}>
                <button
                    type="button"
                    className={`amenity ${
                        this.state[col.key] ? 'selected' : ''
                    }`}
                    onClick={() => {
                        this._toggleTag(col.key);
                    }}
                >
                    <p className="h1">
                        <i className={col.value.faicon} />
                    </p>
                    <p className="h6">{col.value.name}</p>
                </button>
            </td>
        );

        return (
            <table id="amenity-table">
                <tbody>
                    {this._amenityTableStructure.map(
                        (row: amenityTuple[], index: number) => (
                            <tr key={index}>
                                {row.map((col: amenityTuple) =>
                                    renderColumn(col),
                                )}
                            </tr>
                        ),
                    )}
                </tbody>
            </table>
        );
    };

    render() {
        return (
            <div
                id={AmenitiesEditModalID}
                className="modal fade"
                tabIndex={-1}
                role="dialog"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <form>
                        <div className="modal-content">
                            <div className="modal-header">
                                <p className="modal-title h5">편의시설 설정</p>
                            </div>
                            <div className="modal-body">
                                {this._renderTable()}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                >
                                    닫기
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    data-dismiss="modal"
                                >
                                    저장
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
