import React from 'react';

import LocationSearchMap from './location-search-map';

export const LocationEditModalID = 'location-edit-modal';

interface LocationEditModalProps {}

export default class LocationEditModal extends React.Component<
    LocationEditModalProps
> {
    render() {
        return (
            <div
                id={LocationEditModalID}
                className="modal fade"
                tabIndex={-1}
                role="dialog"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title h5">주소 수정</p>
                        </div>
                        <div className="modal-body">
                            <LocationSearchMap />
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
                </div>
            </div>
        );
    }
}
