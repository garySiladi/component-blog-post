import React from 'react';
import urlJoin from 'url-join'

export default class BlogPost extends React.Component {
  static get propTypes() {
    return {
      className: React.PropTypes.string,
      image: React.PropTypes.shape({
        src: React.PropTypes.string,
        caption: React.PropTypes.string,
      }),
      author: React.PropTypes.string,
      byline: React.PropTypes.string,
      section: React.PropTypes.string,
      sectionUrl: React.PropTypes.string,
      flyTitle: React.PropTypes.string,
      title: React.PropTypes.string.isRequired,
      rubric: React.PropTypes.string,
      dateTime: React.PropTypes.instanceOf(Date),
      dateString: React.PropTypes.string,
      timestampISO: React.PropTypes.string,
      dateFormat: React.PropTypes.func,
      text: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.node
      ]).isRequired,
      afterText: React.PropTypes.node,
      itemType: React.PropTypes.string,
      itemProp: React.PropTypes.string,
    };
  }
  static get defaultProps() {
    return {
      itemType: 'http://schema.org/BlogPosting',
      itemProp: 'blogPost',
      dateFormat: (date) => {
        // Sep 19th 2015, 9:49
        function addPostFix(day) {
          const daystr = day.toString();
          const lastChar = daystr.charAt(daystr.length - 1);
          let postFix = '';
          switch (lastChar) {
            case '1':
              postFix = 'st';
              break;
            case '2':
              postFix = 'nd';
              break;
            case '3':
              postFix = 'rd';
              break;
            default:
              postFix = 'th';
              break;
          }
          return `${day}${postFix}`;
        }
        const shortMonthList = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
        let minutes = date.getMinutes() < 10 ? '0' : '';
        minutes += date.getMinutes();
        return [ `${shortMonthList[date.getMonth()]}`,
                 `${addPostFix(date.getDate())}`,
                 `${date.getFullYear()},`,
                 `${date.getHours()}:${minutes}` ].join(' ');
      },
    };
  }
  render() {
    const content = [];
    if (this.props.flyTitle) {
      content.push((
        <h2
          className="blog-post__flytitle"
          itemProp="alternativeHeadline"
          key={`blog-post__flytitle`}
        >{this.props.flyTitle}</h2>
      ));
    }
    if (this.props.title) {
      content.push((
        <h1
          className="blog-post__title"
          itemProp="headline"
          key={`blog-post__title`}
        >{this.props.title}</h1>));
    }
    if (this.props.rubric) {
      content.push((
        <p
          className="blog-post__rubric"
          itemProp="description"
          key={`blog-post__rubric`}
        >{this.props.rubric}</p>
      ));
    }
    if (this.props.image && this.props.image.src) {
      let caption = null;
      if (this.props.image.caption) {
        caption = (
          <figcaption className="blog-post__image-caption">
            {this.props.image.caption}
          </figcaption>
        );
      }
      content.push((
        <figure className="blog-post__image"
          key={`blogimg`}
        >
          <img {...this.props.image}
            itemProp="image"
            className="blog-post__image-block"
          />
          {caption}
        </figure>));
    }
    const asideableContent = [];
    if (this.props.section) {
      let { sectionUrl } = this.props;
      if (sectionUrl) {
        if (!/^(\w+:)?\/\//.test(sectionUrl)) {
          sectionUrl = urlJoin('/', sectionUrl);
        }
      }
      const section = sectionUrl ? (
        <a
          href={sectionUrl}
          className="blog-post__section-link"
        >
          {this.props.section}
        </a>
      ) : this.props.section;
      asideableContent.push((
        <h3
          className="blog-post__section"
          itemProp="articleSection"
          key={`blog-post__section`}
        >{section}</h3>
      ));
    }
    if (this.props.dateTime) {
      asideableContent.push((
        <time
          className="blog-post__datetime"
          itemProp="dateCreated"
          dateTime={this.props.dateTime}
          key={`blog-post__datetime`}
        >{this.props.dateFormat(this.props.dateTime)}</time>));
    }
    if (this.props.dateString && this.props.timestampISO) {
      asideableContent.push((
        <time
          className="blog-post__datetime"
          itemProp="dateCreated"
          dateTime={this.props.timestampISO}
          key={`blog-post__datetime`}
        >{this.props.dateString}</time>));
    }
    if (this.props.byline) {
      asideableContent.push((
        <p className="blog-post__byline-container" key={`blog-post__byline-container`}>
          {"by "}
          <span
            className="blog-post__byline"
            itemProp="author"
          >{this.props.byline}</span>
        </p>));
    }
    if (asideableContent.length) {
      content.push((
        <div className="blog-post__asideable-content blog-post__asideable-content--meta" key="asideable-content">
          {asideableContent}
        </div>
      ))
    }
    if (this.props.author) {
      content.push((
        <div
          className="blog-post__author"
          itemProp="author"
          key={`blog-post__author`}
        >
          {this.props.author}
        </div>));
    }
    if (typeof this.props.text === 'string') {
      content.push((
        <div
          className="blog-post__text"
          itemProp="description"
          key={`blog-post__text`}
          /* eslint-disable react/no-danger */
          dangerouslySetInnerHTML={{
            '__html': this.props.text,
          }}
        />));
    } else if (this.props.text) {
      content.push((
        <div
          className="blog-post__text"
          itemProp="description"
          key={`blog-post__text`}
        >
          {this.props.text}
        </div>
      ));
    }
    if (this.props.afterText) {
      content.push(this.props.afterText);
    }

    let className = 'blog-post';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    return (
      <article
        className={className}
        itemScope itemType={this.props.itemType} itemProp={this.props.itemProp}
        role="article"
      >
        {content}
      </article>
    );
  }
}
