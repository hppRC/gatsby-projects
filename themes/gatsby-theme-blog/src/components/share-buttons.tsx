import path from 'path';
import React from 'react';
import Helmet from 'react-helmet';
import {
    FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon,
    TwitterShareButton
} from 'react-share';

import styled from '@emotion/styled';

import { useHpprcThemeConfig, useSiteMetadata } from '../hooks';

type ContainerProps = { title: string; slug: string };
type Props = { twitter: string; siteUrl: string; blogPath: string } & ContainerProps;

const Hatebu: React.FCX = () => (
  <>
    <Helmet>
      <script type='text/javascript' src='//b.st-hatena.com/js/bookmark_button.js' async />
    </Helmet>
    <a
      href='http://b.hatena.ne.jp/entry/'
      className='hatena-bookmark-button'
      data-hatena-bookmark-layout='vertical-normal'
      data-hatena-bookmark-lang='ja'
      title='このエントリーをはてなブックマークに追加'
    >
      <img
        src='//b.st-hatena.com/images/entry-button/button-only@2x.png'
        alt='このエントリーをはてなブックマークに追加'
        width='20'
        height='20'
        style={{ border: 'none' }}
      />
    </a>
  </>
);

const Component: React.FCX<Props> = ({ className, title, slug, twitter, siteUrl, blogPath }) => {
  const twitterAccount = twitter.split('/').pop();
  const articleUrl = `${siteUrl}${path.join(blogPath, slug)}`;
  return (
    <div className={className}>
      <div>
        <FacebookShareButton url={articleUrl}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <LinkedinShareButton url={articleUrl}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <TwitterShareButton title={`${title}\n`} via={twitterAccount} url={articleUrl}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
      <div>
        <Hatebu />
      </div>
    </div>
  );
};

const StyledComponent = styled(Component)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5rem 1rem;

  > div {
    display: flex;
    flex-direction: row-reverse;
    margin: 1rem 0;
    > button {
      margin: 0 0.8rem 0 0;
      transition: opacity 0.3s;
      :hover {
        opacity: 0.6;
      }
    }
  }

  @media screen and (max-width: 1100px) {
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
    flex-direction: row-reverse;
    justify-content: space-between;
    padding: 2rem;
    > div {
      > button {
        margin: 0 0.4rem;
      }
    }
  }
  @media screen and (max-height: 430px) {
  }
`;

const Container: React.FCX<ContainerProps> = ({ title, slug }) => {
  const { social = {} } = useSiteMetadata();
  const { twitter = 'https://twitter.com/hpp_ricecake' } = social;
  const { siteUrl, blogPath } = useHpprcThemeConfig();

  return <StyledComponent {...{ twitter, siteUrl, blogPath, title, slug }} />;
};

export default Container;
