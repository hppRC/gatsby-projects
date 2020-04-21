import React from 'react';

import { css, Global } from '@emotion/core';

import { useTheme } from '../theme';

export default () => {
  const theme = useTheme();
  return (
    <Global
      styles={css`
        body {
          background-color: ${theme.backgroundColor};
        }

        .gatsby-highlight {
          background-color: ${theme.codeBackground};
        }

        .gatsby-code-title {
          background-color: ${theme.codeBackground};
        }

        @media screen and (max-width: 1100px) {
        }
        @media screen and (max-width: 768px) {
        }
        @media screen and (max-width: 480px) {
        }
        @media screen and (max-height: 430px) {
        }
      `}
    />
  );
};
