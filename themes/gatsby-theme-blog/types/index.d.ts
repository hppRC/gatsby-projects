import { FluidObject } from 'gatsby-image';
import { DeepPartial, DeepReadonly } from 'utility-types';

export type Frontmatter = DeepReadonly<
  Partial<{
    slug: string;
    title: string;
    date: string;
    tags: string[];
    cover: {
      childImageSharp: {
        fluid: FluidObject;
      };
    };
  }>
>;

export type UseAllPosts = DeepReadonly<{
  allMdx: {
    nodes: {
      body: string;
      excerpt: string;
      frontmatter: Frontmatter;
    }[];
  };
}>;

export type PostsByTag = {
  [key: string]: { frontmatter: Frontmatter; excerpt: string }[];
};

export type UseAllTags = DeepReadonly<{
  allMdx: {
    nodes: {
      frontmatter: {
        tags: string[];
      };
    }[];
  };
}>;

export type UseAnyImage = DeepReadonly<{
  allFile: Partial<{
    nodes: {
      relativePath: string;
      childImageSharp: {
        fluid: FluidObject;
      };
    }[];
  }>;
}>;

export type UseSiteBuildtime = DeepReadonly<{
  site: {
    buildTime: string;
  };
}>;

export type UseSiteMetadata = DeepReadonly<{
  site: {
    siteMetadata: DeepPartial<{
      siteTitle: string;
      siteTitleAlt: string;
      siteHeadline: string;
      siteUrl: string;
      siteDescription: string;
      siteLanguage: string;
      author: string;
      social: {
        twitter: string;
        github: string;
        qiita: string;
      };
    }>;
  };
}>;
