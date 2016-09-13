import React from 'react';

export default function Comments({ firstToCommentLabel, commentCount, viewCommentsLabel, commentsUri }) {
  const label = (commentCount > 0) ?
    `${ viewCommentsLabel } (${ commentCount })` :
    firstToCommentLabel;
  return (
    <a className="blog-post__comments" href={commentsUri}>
      <div className="blog-post__comments-icon icon icon--balloon-berlin" />
      <div className="blog-post__comments-label">
        {label}
      </div>
    </a>
  );
}

if (process.env.NODE_ENV !== 'production') {
  Comments.propTypes = {
    firstToCommentLabel: React.PropTypes.string.isRequired,
    commentCount: React.PropTypes.number.isRequired,
    commentsUri: React.PropTypes.string,
    viewCommentsLabel: React.PropTypes.string.isRequired,
  };
}
