import { css } from '@emotion/react';
import React from 'react';

const noListCss = css({
  textAlign: 'center',
  fontSize: '30px',
  margin: '50px 0',
  width: '100%'
})

const NoList = () => {
  return (
    <p css={noListCss}>List Is Empty.</p>
  )
}

export default NoList