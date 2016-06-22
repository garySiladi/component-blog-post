import 'babel-polyfill';
import BlogPost from '../src';
import MobileDetect from 'mobile-detect';
import React from 'react';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from 'enzyme';
import Sticky from '@economist/component-stickyfill';
chai.use(chaiEnzyme()).use(sinonChai).should();

function mountComponent(requiredProps) {
  return function (additionalProps) {
    return mount(<BlogPost {...requiredProps} {...additionalProps} />);
  };
}

const requiredProps = {
  flyTitle: 'Required flyTitle',
  section: 'Required section',
  text: 'Required text',
  title: 'Required title',
  commentCount: 10,
  commentsUri: 'http://google.com',
  viewCommentsLabel: 'foo',
  commentStatus: 'readwrite',
};

const mountComponentWithProps = mountComponent(requiredProps);
describe('BlogPost', () => {
  it('is compatible with React.Component', () => {
    BlogPost.should.be.a('function')
      .and.respondTo('render');
  });

  it('renders a React element', () => {
    React.isValidElement(<BlogPost {...requiredProps} />).should.equal(true);
  });

  describe('Simple rendering', () => {
    let post = null;
    before(() => {
      post = mountComponentWithProps();
    });

    it('renders a section', () => {
      post.should.have.exactly(1).descendants('.blog-post__section');
      post.find('.blog-post__section').should.have.text(requiredProps.section);
      post.find('.blog-post__section').should.have.tagName('h3');
    });

    it('renders a flytitle', () => {
      post.should.have.className('blog-post')
      .and.have.exactly(1).descendants('.blog-post__flytitle');
      post.find('.blog-post__flytitle').should.have.text(requiredProps.flyTitle);
    });

    it('renders a title', () => {
      post.should.have.exactly(1).descendants('.blog-post__title');
      post.find('.blog-post__title').should.have.tagName('h1');
      post.find('.blog-post__title').should.have.text(requiredProps.title);
    });

    it('renders a text', () => {
      post.should.have.exactly(1).descendants('.blog-post__text');
      post.find('.blog-post__text').should.have.text(requiredProps.text);
    });

    it('renders the section name', () => {
      post.find('.blog-post__section').should.have.text(requiredProps.section);
    });

  });

  describe('Comments', () => {
    it('renders the comments (#comments > 0)', () => {
      const post = mountComponentWithProps({ commentCount: 10 });
      post.should.have.exactly(1).descendants('.blog-post__comments');
      post.find('.blog-post__comments').should.have.attr('href', requiredProps.commentsUri);
      post.find('.blog-post__comments-label')
      .should.have.text('foo (10)');
    });

    it('renders the comments (#comments = 0)', () => {
      const post = mountComponentWithProps({ commentCount: 0 });
      post.should.have.exactly(1).descendants('.blog-post__comments');
      post.find('.blog-post__comments').should.have.attr('href', requiredProps.commentsUri);
      post.find('.blog-post__comments-label').should.have.text('Be the first to comment');
    });

    it('hides the comments when comments are disabled', () => {
      const post = mountComponentWithProps({ commentStatus: 'disabled' });
      post.should.not.have.descendants('.blog-post__comments');
    });

    it('hides the comments when #comments = 0 and comments are closed', () => {
      const post = mountComponentWithProps({ commentStatus: 'readonly', commentCount: 0 });
      post.should.not.have.descendants('.blog-post__comments');
    });

  });

  it('formats a date', () => {
    const today = new Date(2015, 12 - 1, 15, 20, 18);
    const post = mountComponentWithProps({ dateTime: today });
    post.should.have.exactly(1).descendants('.blog-post__datetime');
    post.find('.blog-post__datetime').should.have.tagName('time');
    post.find('.blog-post__datetime').should.have.text('Dec 15th 2015, 20:18');
  });

  it('receives and renders a date string and an ISO timestamp', () => {
    const post = mountComponentWithProps({
      dateString: 'some date, 2015',
      timestampISO: '2014-12-31T01:40:30Z',
    });
    post.should.have.exactly(1).descendants('.blog-post__datetime');
    post.find('.blog-post__datetime').should.have.tagName('time');
    post.find('.blog-post__datetime').should.have.text('some date, 2015');
    post.find('.blog-post__datetime').should.have.attr('datetime', '2014-12-31T01:40:30Z');
  });

  it('renders a dateTime', () => {
    const today = new Date();
    function dateFormat(date) {
      return date.toString();
    }
    const post = mountComponentWithProps({
      dateFormat,
      dateTime: today,
    });
    post.should.have.exactly(1).descendants('.blog-post__datetime');
    post.find('.blog-post__datetime').should.have.tagName('time');
    post.find('.blog-post__datetime').should.have.text(today.toString());
  });

  it('can render the text as react "children" as opposed to dangerouslySetInnerHTML', () => {
    const post = mountComponentWithProps({ text: <div className="foo" /> });
    post.find('.blog-post__text').should.have.exactly(1).descendants('.foo');
  });

  it('renders an image', () => {
    const image = {
      src: '//cdn.static-economist.com/sites/all/themes/econfinal/images/svg/logo.svg',
      alt: 'Example',
      caption: 'Image caption',
    };
    const post = mountComponentWithProps({ image });
    post.should.have.exactly(1).descendants('.blog-post__image-block');
    post.find('.blog-post__image-block').should.have.attr('src')
      .equal('//cdn.static-economist.com/sites/all/themes/econfinal/images/svg/logo.svg');
    post.find('.blog-post__image-block').should.have.attr('alt', 'Example');
  });

  it('renders the section link in case of a link', () => {
    const post = mountComponentWithProps({ sectionUrl: 'foo/bar/baz' });
    post.find('.blog-post__section-link').should.have.attr('href', '/foo/bar/baz');
    post.find('.blog-post__section-link').should.have.text(requiredProps.section);
  });

  it('also works with links pointing to other domains', () => {
    const post = mountComponentWithProps({ sectionUrl: 'http://foo.io/bar/baz' });
    post.find('.blog-post__section-link').should.have.attr('href', 'http://foo.io/bar/baz');
  });

  describe('Invalid props', () => {
    it('should render when `props.image` is null', () => {
      const post = mountComponentWithProps({ image: null });
      post.should.have.exactly(1).descendants('.blog-post__flytitle');
      post.should.have.exactly(1).descendants('.blog-post__title');
      post.should.have.exactly(1).descendants('.blog-post__text');
      post.should.not.have.descendants('.blog-post__image');
    });
  });

  describe('Sharebar', () => {
    let mobileDetector = null;
    before(() => {
      /* global window:false */
      mobileDetector = new MobileDetect(window.navigator.userAgent);
    });

    describe('desktop', () => {
      before(function () {
        if (mobileDetector.mobile()) {
          this.skip(); // eslint-disable-line no-invalid-this
        }
      });

      it('should feature the twitter and facebook share buttons', () => {
        const post = mountComponentWithProps();
        const twitterShareLinkNode = post.find('.share__icon--twitter').find('a');
        twitterShareLinkNode.should.have.attr('href', 'https://twitter.com/intent/tweet?url=');
        const facebookShareLinkNode = post.find('.share__icon--facebook').find('a');
        facebookShareLinkNode.should.have.attr('href', 'http://www.facebook.com/sharer/sharer.php?u=');
      });

      it('should show the other providers when clicking on the share button', () => {
        const post = mountComponentWithProps();
        const shareBalloonNode = post.find('.blog-post__toggle-share');
        const balloonContentNode = shareBalloonNode.find('.balloon-content');
        shareBalloonNode.should.have.className('balloon--not-visible');
        shareBalloonNode.find('a.balloon__link').simulate('click');
        shareBalloonNode.should.have.className('balloon--visible');

        balloonContentNode.should.have.exactly(1).descendants('.share__icon--linkedin');
        balloonContentNode.find('.share__icon--linkedin').find('a')
          .should.have.attr('href', 'https://www.linkedin.com/cws/share?url=');

        balloonContentNode.should.have.exactly(1).descendants('.share__icon--googleplus');
        balloonContentNode.find('.share__icon--googleplus').find('a')
          .should.have.attr('href', 'https://plus.google.com/share?url=');

        balloonContentNode.should.have.exactly(1).descendants('.share__icon--mail');
        balloonContentNode.find('.share__icon--mail').find('a')
          .should.have.attr('href', 'mailto:?body=');

        balloonContentNode.should.have.exactly(1).descendants('.share__icon--print');
        balloonContentNode.find('.share__icon--print').find('a')
          .should.have.attr('href', 'javascript:if(window.print)window.print()'); // eslint-disable-line no-script-url
      });

      it('should monitor sharebar element when window resizes/scrolls', () => {
        sinon.spy(window, 'addEventListener');
        const post = mountComponentWithProps();
        const instance = post.component.getInstance();
        window.addEventListener
          .should.have.been.calledWith('resize', instance.checkAsideableContainerHeightHandler);
        window.addEventListener
          .should.have.been.calledWith('scroll', instance.checkAsideableContainerHeightHandler);

        // avoid chai complaining about global leaks
        window.addEventListener.restore();
        Reflect.deleteProperty(window, 'addEventListener');
      });

      it('should remove the listeners when unmounted', () => {
        sinon.spy(window, 'removeEventListener');
        const post = mountComponentWithProps();
        const instance = post.component.getInstance();
        post.unmount();
        window.removeEventListener
          .should.have.been.calledWith('resize', instance.checkAsideableContainerHeightHandler);
        window.removeEventListener
          .should.have.been.calledWith('scroll', instance.checkAsideableContainerHeightHandler);

        window.removeEventListener.restore();
        // avoid chai complaining about global leaks
        Reflect.deleteProperty(window, 'removeEventListener');
      });

      it('should immediately check for sharebar position when mounted', () => {
        const checkSpy = sinon.spy(BlogPost.prototype, 'checkAsideableContainerHeight');
        const post = mountComponentWithProps();
        checkSpy.should.have.callCount(1);
        BlogPost.prototype.checkAsideableContainerHeight.restore();
        post.unmount();
      });

      it('should set its height to match the article when pulled out of the article area', () => {
        const boundaryCheckSpy = sinon.spy(BlogPost.prototype, 'isWithinBoundaries');
        const asideHeightSpy = sinon.spy(BlogPost.prototype, 'setAsideableContainerHeight');
        sinon.stub(BlogPost.prototype, 'getDOMElementFromRef', (ref) => {
          const isSticky = Sticky.prototype.isPrototypeOf(ref);
          return {
            style: {},
            offsetTop: (isSticky ? 200 : 0),
            offsetHeight: (isSticky ? 0 : 1000),
            /* eslint-disable arrow-body-style */
            getBoundingClientRect: () => {
              return Sticky.prototype.isPrototypeOf(ref) ?
                { left: -87, right: -2 } :
                { left: 0, right: 100 };
            },
            /* eslint-enable arrow-body-style */
          };
        });

        const post = mountComponentWithProps();
        boundaryCheckSpy.should.have.callCount(1);
        asideHeightSpy.should.have.been.calledWith('800px');
        BlogPost.prototype.getDOMElementFromRef.restore();
        BlogPost.prototype.setAsideableContainerHeight.restore();
        BlogPost.prototype.isWithinBoundaries.restore();
        post.unmount();
      });

      it('should reset its height to nil when within the article horizontal boundaries', () => {
        const asideHeightSpy = sinon.spy(BlogPost.prototype, 'setAsideableContainerHeight');
        /* eslint-disable arrow-body-style */
        sinon.stub(BlogPost.prototype, 'getDOMElementFromRef', () => {
          return {
            style: {},
            offsetTop: 0,
            offsetHeight: 1000,
            getBoundingClientRect: () => ({ left: 0, right: 100 }),
          };
        });
        /* eslint-enable arrow-body-style */
        const post = mountComponentWithProps();
        asideHeightSpy.should.have.been.calledWith('auto');
        BlogPost.prototype.getDOMElementFromRef.restore();
        BlogPost.prototype.setAsideableContainerHeight.restore();
        post.unmount();
      });
    });

    describe('mobile', () => {
      before(function () {
        if (!mobileDetector.mobile()) {
          this.skip(); // eslint-disable-line no-invalid-this
        }
      });

      it('should show the mobile providers', () => {
        const post = mountComponentWithProps();
        const shareBalloonNode = post.find('.blog-post__toggle-share-mobile');
        const balloonContentNode = shareBalloonNode.find('.balloon-content');
        balloonContentNode.should.have.exactly(1).descendants('.share__icon--twitter');
        balloonContentNode.find('.share__icon--twitter').find('a')
          .should.have.attr('href', 'https://twitter.com/intent/tweet?url=');

        balloonContentNode.should.have.exactly(1).descendants('.share__icon--facebook');
        balloonContentNode.find('.share__icon--facebook').find('a')
          .should.have.attr('href', 'http://www.facebook.com/sharer/sharer.php?u=');

        balloonContentNode.should.have.exactly(1).descendants('.share__icon--linkedin');
        balloonContentNode.find('.share__icon--linkedin').find('a')
          .should.have.attr('href', 'https://www.linkedin.com/cws/share?url=');

        balloonContentNode.should.have.exactly(1).descendants('.share__icon--googleplus');
        balloonContentNode.find('.share__icon--googleplus').find('a')
          .should.have.attr('href', 'https://plus.google.com/share?url=');

        balloonContentNode.should.have.exactly(1).descendants('.share__icon--mail');
        balloonContentNode.find('.share__icon--mail').find('a')
          .should.have.attr('href', 'mailto:?body=');

        balloonContentNode.should.have.exactly(1).descendants('.share__icon--whatsapp');
        balloonContentNode.find('.share__icon--whatsapp').find('a')
          .should.have.attr('href', 'whatsapp://send?text=');
      });
    });
  });
});
