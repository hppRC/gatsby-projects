import { FluidObject } from 'gatsby-image';

export type AllPosts = {
  allMdx: {
    nodes: {
      id: string;
      body: string;
      excerpt: string;
      frontmatter: Frontmatter;
    }[];
  };
};

export type Frontmatter = Partial<{
  slug: string;
  title: string;
  date: string;
  tags: string[];
  cover: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}>;

export type PostByTag = {
  [key: string]: { frontmatter: Frontmatter; excerpt: string }[];
};

export type SiteMetadata = {
  site: {
    siteMetadata: Partial<{
      siteTitle: string;
      siteTitleAlt: string;
      siteHeadline: string;
      siteUrl: string;
      siteDescription: string;
      siteLanguage: string;
      author: string;
      social: Partial<{
        twitter: string;
        github: string;
        qiita: string;
      }>;
    }>;
  };
};

export type Site = {
  site: {
    buildTime: string;
  };
};

export type AllFile = {
  allFile: {
    nodes: {
      relativePath: string;
      childImageSharp: {
        fluid: FluidObject;
      };
    }[];
  };
};
