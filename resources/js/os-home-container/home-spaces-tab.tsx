import React from 'react';
import { connect } from 'react-redux';

import RootState from '../redux-types';

import SpaceTrees from '../model/space-tree';

interface _ReduxProps {
    /**
     * All spaces in tree structure
     */
    spaceTrees: SpaceTrees;
}

interface HomeSpacesTabProps extends _ReduxProps {}

class _HomeSpacesTab extends React.Component<HomeSpacesTabProps> {
    private _renderSpace(selcted = false) {
        return (
            <a className={`space-item ${selcted ? 'selected' : ''}`}>
                <img src="./demo-images/about_img_01.jpg" className="rounded" />
                <div className="space-item-body">
                    <p className="h5 os-text-ellipsis">스타벅스 자양점</p>
                    <p className="h6 os-grey-1">
                        <i className="material-icons">location_on</i>
                        서울 송파구 올림픽로 35길 104
                    </p>
                </div>
            </a>
        );
    }

    private _renderSpaceTrees = () => {
        console.log(this.props.spaceTrees);
        return null;
    };

    render() {
        return <div id="home-spaces-tab">{this._renderSpaceTrees()}</div>;
    }
}

const mapStateToProps = (state: RootState): _ReduxProps => ({
    spaceTrees: state.spaceTrees,
});

const mapDispatchToProps = {};

const HomeSpacesTab = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_HomeSpacesTab);

export default HomeSpacesTab;
