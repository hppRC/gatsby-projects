type Props = {
  basePath: string;
  blogPath: string;
  postsPath: string;
  pagesPath: string;
  tagsPath: string;
  externalLinks: string[];
  navigation: string[];
  showLineNumbers: boolean;
};

const withDefault = (themeOptions: Props) => {
  const {
    basePath = '/',
    blogPath = '/blog',
    postsPath = 'content/posts',
    pagesPath = 'content/posts',
    tagsPath = '/tags',
    externalLinks = [],
    navigation = [],
    showLineNumbers = true
  } = themeOptions;

  console.log('theme options', themeOptions);

  return {
    basePath,
    blogPath,
    postsPath,
    pagesPath,
    tagsPath,
    externalLinks,
    navigation,
    showLineNumbers
  };
};

export default withDefault;
