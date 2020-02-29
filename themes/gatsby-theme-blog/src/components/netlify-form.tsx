import React, { memo } from 'react';

import styled from '@emotion/styled';

import { Theme } from '../../types';
import { useTheme } from '../theme';

type ContainerProps = {};
type Props = { theme: Theme } & ContainerProps;

const Component: React.FCX<Props> = memo(({ className }) => (
  <form className={className} name='contact' method='POST' data-netlify='true' data-netlify-honeypot='bot-field'>
    <input type='hidden' name='form-name' value='contact' />
    <input type='hidden' name='bot-field' />
    <label>
      name<abbr title='required'>*</abbr>
      <input
        type='text'
        className='form-control'
        name='name'
        placeholder='your name'
        maxLength={30}
        minLength={2}
        required
        autoComplete='name'
      />
    </label>

    <label>
      mail<abbr title='required'>*</abbr>
      <input
        type='email'
        name='email'
        placeholder='your e-mail'
        pattern="^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
        required
        autoComplete='email'
      />
    </label>

    <label>
      <p>message</p>
      <abbr title='required'></abbr>
      <textarea name='content' rows={8} required />
    </label>

    <button type='submit'>submit</button>
  </form>
));

const StyledComponent = styled(Component)`
  position: relative;

  abbr {
    text-decoration: none;
  }

  label {
    display: block;
    width: 100%;
    max-width: 300px;
    padding: 1rem 0;
  }

  textarea {
    width: 100%;
    color: ${({ theme }) => theme.color};
    border: 2px solid ${({ theme }) => theme.color};
    transition: border 0.5s;
    :focus {
      border: 2px solid ${({ theme }) => theme.color};
      outline: none;
    }
  }

  input[type='text'],
  input[type='email'] {
    width: 100%;
    padding: 0.3em;
    border: none;
    border-bottom: 2px solid ${({ theme }) => theme.color};
    transition: 0.5s;
    :focus {
      border-bottom: 2px solid ${({ theme }) => theme.color};
      outline: none;
    }
  }

  button {
    padding: 0.5rem 1rem;
    color: ${({ theme }) => theme.color};
    border: 2px solid ${({ theme }) => theme.color};
    border-radius: 5px;
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

const Container: React.FCX<ContainerProps> = () => {
  const theme = useTheme();
  return <StyledComponent theme={theme} />;
};

export default memo(Container);
