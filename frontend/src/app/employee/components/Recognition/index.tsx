'use client';

import { css } from '@emotion/react';
import React from 'react';

const recognitionCss = {
  wrapper: css({
    height: '150px',
    width: '100%',
    padding: '12px',
  }),
  thumbnail: css({
    objectFit: 'contain',
  })
};

interface Props {}

const Recongnition = (props: Props) => {
  return (
    <div>Recongnition</div>
  )
}

export default Recongnition