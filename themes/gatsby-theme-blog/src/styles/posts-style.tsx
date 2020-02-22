import { css } from '@emotion/core';

export default css`
  position: relative;

  > section:nth-of-type(1) {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 75vh;

    > h1 {
      font-size: 10rem;
      color: #ffffff;
    }
  }

  > section:nth-of-type(2) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 2rem;
    /* max-width: 1400px; */
    padding: 5rem;
    margin: 0 auto;
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
