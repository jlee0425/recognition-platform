import React from 'react'
import { useRecogState } from '../RecogModalContext';
import { css } from '@emotion/react';

const completionCss = css({
  display: 'grid',
  placeItems: 'center',
  padding: '200px 0'
});

const RecogCompleted = () => {
  const { user } = useRecogState();

  return (
    <div css={completionCss}>
      <h3>THANK YOU.</h3>
      <br />
      <p>You have sent your recognition to <strong>{user?.profile.firstname}.</strong></p>
      <br />
      <p>His/Her manager has been notified as well.</p>
    </div>
  )
}

export default RecogCompleted;