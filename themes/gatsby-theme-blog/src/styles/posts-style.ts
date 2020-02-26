import { css } from '@emotion/core';

export default css`
  position: relative;

  > section {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 75vh;

    > h1 {
      font-size: 10rem;
      color: #ffffff;
    }
  }

  > ul {
    display: grid;
    grid-template-columns: repeat(4, 24%);
    grid-row-gap: 3rem;
    justify-content: space-between;

    padding: 3%;
  }

  @media screen and (max-width: 1100px) {
  }
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 480px) {
  }
  @media screen and (max-height: 430px) {
  }
`;
