import Balloon from '@economist/component-balloon';
import Icon from '@economist/component-icon';
import MobileDetect from 'mobile-detect';
import React from 'react';
import ShareBar from '@economist/component-sharebar';
import classnames from 'classnames';

function generateCopyrightUrl(title, publicationDate, contentID) {
  return `https://s100.copyright.com/AppDispatchServlet?
publisherName=economist&
publication=economist&
title=${ title }&
publicationDate=${ publicationDate }&
contentID=${ contentID }`;
}

function DesktopProviders({ title = '', publicationDate = '', contentID = '' } = {}) {
  return (<div className="blog-post__sharebar-desktop">
    <ShareBar
      icons={[ 'linkedin', 'googleplus', 'mail', 'print', 'purchaseRights' ]}
      urlOverrides={{
        mail: 'mailto:?body=',
        purchaseRights: generateCopyrightUrl(title, publicationDate, contentID),
      }}
    />
  </div>);
}
function MobileProviders({ title = '', publicationDate = '', contentID = '' } = {}) {
  return (<div className="blog-post__sharebar-mobile">
    <ShareBar
      icons={[
        'linkedin',
        'googleplus',
        'mail',
        'whatsapp',
        'purchaseRights',
      ]}
      urlOverrides={{
        mail: 'mailto:?body=',
        purchaseRights: generateCopyrightUrl(title, publicationDate, contentID),
      }}
    />
  </div>);
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
      <ShareBar icons={[ 'twitter', 'facebook' ]} />
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
