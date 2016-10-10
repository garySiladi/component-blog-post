import React from 'react';

export default function Comments({ firstToCommentLabel, commentCount, viewCommentsLabel, commentsUri }) {
  let content = firstToCommentLabel;
  let pre = null;
  let post = null;
  if (commentCount > 0) {
    content = commentCount;
    pre = <span className="blog-post__comments-precontent">{`${ viewCommentsLabel } (`}</span>;
    post = <span className="blog-post__comments-precontent">{')'}</span>;
  }
  return (
    <a className="blog-post__comments" href={commentsUri}>
      <div className="blog-post__comments-icon icon icon--balloon-berlin" />
      <div className="blog-post__comments-label">
        {pre}
        <span className="blog-post__comments-content">{content}</span>
        {post}
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
