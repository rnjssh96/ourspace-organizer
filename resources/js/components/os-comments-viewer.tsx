import React from 'react';

const COMMENTS = [
    {
        commentID: 1,
        userUsername: 'Inchan',
        date: '2019-0-29 | 오후 5시 30분',
        comment: 'this is a great place to work',
    },
    {
        commentID: 2,
        userUsername: 'Inchan',
        date: '2019-0-29 | 오후 5시 30분',
        comment: 'this is a great place to work',
    },
    {
        commentID: 3,
        userUsername: 'Inchan',
        date: '2019-0-29 | 오후 5시 30분',
        comment: 'this is a great place to work',
    },
    {
        commentID: 4,
        userUsername: 'Inchan',
        date: '2019-0-29 | 오후 5시 30분',
        comment: 'this is a great place to work',
    },
];

export default class OSCommentsViewer extends React.Component {
    private _renderEmpty() {
        return (
            <div id="empty-comment" className="comment">
                <p className="h6 os-grey-1">사용자가 남긴 후기가 없습니다.</p>
            </div>
        );
    }

    private _renderComment(comment: any) {
        return (
            <div key={comment.commentID} className="comment">
                <div id="top">
                    <p className="h5">
                        <b>inchan</b>
                    </p>
                    <p className="h6 os-grey-1">2019-0-29 | 오후 5시 30분</p>
                </div>
                <p className="h5">this is a great place to work</p>
            </div>
        );
    }

    private _renderCommentsBox(comments: any) {
        if (comments.length <= 0) {
            return this._renderEmpty();
        } else {
            return comments.map((comment: any) => this._renderComment(comment));
        }
    }

    render() {
        return (
            <div id="os-comments-viewer">
                <div id="header">
                    <p className="h4">후기</p>
                </div>
                <div id="body">{this._renderCommentsBox(COMMENTS)}</div>
            </div>
        );
    }
}
