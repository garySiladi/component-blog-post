import Balloon from '@economist/component-balloon';
import Icon from '@economist/component-icon';
import MobileDetect from 'mobile-detect';
import React from 'react';
import ShareBar from '@economist/component-sharebar';
import classnames from 'classnames';
import url from 'url';

function generateCopyrightUrl(type, title, publicationDate, contentID) {
  return url.format({
    protocol: 'https:',
    host: 's100.copyright.com',
    pathname: '/AppDispatchServlet',
    query: {
      publisherName: 'economist',
      publication: 'economist',
      title,
      publicationDate,
      contentID,
      type,
      orderBeanReset: 0,
    },
  });
}
function providersContent(platform, componentProps, purchaseRights) {
  // If the MobileProviders/DesktopProviders component is called with arguments
  // we need to include purchase rights on the sharebar
  if (purchaseRights.type) {
    componentProps.icons.push('purchaseRights');
    componentProps.urlOverrides.purchaseRights = generateCopyrightUrl(
      purchaseRights.type,
      purchaseRights.title,
      purchaseRights.publicationDate,
      purchaseRights.contentID
    );
  }

  return (
    <div
      className={`blog-post__sharebar-${ platform }`}
      style={purchaseRights.type ? { fontSize: '30px' } : {}}
    >
      <ShareBar {...componentProps} />
    </div>
  );
}
function DesktopProviders(props = {}) {
  const icons = [
    'linkedin',
    'googleplus',
    'mail',
    'print',
  ];
  const urlOverrides = {
    mail: 'mailto:?body=',
  };
  return providersContent('mobile', { icons, urlOverrides }, props);
}
function MobileProviders(props = {}) {
  const icons = [
    'linkedin',
    'googleplus',
    'mail',
    'whatsapp',
  ];
  const urlOverrides = {
    mail: 'mailto:?body=',
  };
  return providersContent('mobile', { icons, urlOverrides }, props);
}
export default function BlogPostSideBar(props = {}) {
  const shareBarTrigger = (
    <a href="/Sections">
      <Icon className="blog-post__sharebar-icon-more" icon="more" size="23px" />
      <span className="blog-post__sharebar-word-more">More</span>
    </a>
  );

  let isMobile = false;
  if (typeof window !== 'undefined') {
    /* global window:false */
    const mobileDetector = new MobileDetect(window.navigator.userAgent);
    isMobile = mobileDetector.mobile() !== null;
  }

  return (
    <div className="blog-post__sharebar">
      <ShareBar
        icons={[ 'twitter', 'facebook' ]}
        title={props.title}
        flyTitle={props.flyTitle}
      />
      <Balloon
        className={classnames(
          'blog-post__toggle-share',
          { 'blog-post__toggle-share-mobile': isMobile }
        )}
        shadow={false}
        trigger={shareBarTrigger}
      >
      {isMobile ? <MobileProviders {...props} /> : <DesktopProviders {...props} />}
      </Balloon>
    </div>
  );
}

if (process.env.NODE_ENV !== 'production') {
  BlogPostSideBar.propTypes = {
    title: React.PropTypes.string,
    flyTitle: React.PropTypes.string,
  };
}
