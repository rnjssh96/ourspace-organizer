import React, { MouseEvent } from 'react';

import {
    AmenityTag,
    amenities,
    interpretAmenity,
    interpretedAmentiy,
} from '../../model/space';

/**
 *
 *
 * AmenitiesEditModal props
 *
 *
 */
interface AmenitiesEditModalProps extends _ReduxProps, _ReduxActionCreators {}

/**
 *
 *
 * AmenitiesEditModal component
 *
 *
 */
export const AmenitiesEditModalID = 'amenities-edit-modal';

const COL_PER_ROW = 4;
const tags = Object.keys(amenities) as AmenityTag[];

type amenityTuple = {
    key: AmenityTag;
    value: interpretedAmentiy;
};

class _AmenitiesEditModal extends React.Component<AmenitiesEditModalProps> {
    private _amenityTableStructure: amenityTuple[][] = [];

    componentWillMount() {
        let row: amenityTuple[];
        let col: number;
        tags.map((tag: AmenityTag, index: number) => {
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
    }

    private _saveAmenityTags = (event: MouseEvent) => {
        event.preventDefault();

        if (this.props.currentSpaceID) {
            let tags: AmenityTag[] = [];
            this.props.selectedAmenities.forEach((tag: AmenityTag) => {
                tags.push(tag);
            });
            this.props.updateAmenityTags(this.props.currentSpaceID, tags);
        }
    };

    private _toggleSelected = (tag: AmenityTag) => {
        if (this.props.selectedAmenities.has(tag)) {
            this.props.selectedAmenities.delete(tag);
        } else {
            this.props.selectedAmenities.add(tag);
        }
        this.props.setSelectedAmenities(new Set(this.props.selectedAmenities));
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
                        this.props.selectedAmenities.has(col.key)
                            ? 'selected'
                            : ''
                    }`}
                    onClick={() => {
                        this._toggleSelected(col.key);
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
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title h5">편의시설 설정</p>
                        </div>
                        <div className="modal-body">{this._renderTable()}</div>
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
                                onClick={this._saveAmenityTags}
                            >
                                저장
                            </button>
                        </div>
                    </div>
                </div>
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
import RootState from '../../redux-types';

import { setSelectedAmenities } from '../../actions/selected-amenities';

import { updateAmenityTags } from '../../thunk-action/current-space';

interface _ReduxProps {
    /**
     * Current space ID
     */
    currentSpaceID?: string;

    /**
     * Selected amenities set
     */
    selectedAmenities: Set<AmenityTag>;
}

interface _ReduxActionCreators {
    /**
     * Set selected amenities
     */
    setSelectedAmenities: typeof setSelectedAmenities;

    /**
     * Update amenity tags
     */
    updateAmenityTags: (spaceID: string, amenityTags: AmenityTag[]) => void;
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    currentSpaceID: state.currentSpace.data && state.currentSpace.data.id,
    selectedAmenities: state.selectedAmenities.selectedAmenities,
});

const mapDispatchToProps = {
    setSelectedAmenities,
    updateAmenityTags,
};

const AmenitiesEditModal = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_AmenitiesEditModal);

export default AmenitiesEditModal;
