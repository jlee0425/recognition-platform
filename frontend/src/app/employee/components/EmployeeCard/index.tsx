'use client';

import React from 'react';
import { css } from '@emotion/react';
import { User } from '@/src/types/user';
import EmployeeCardWrapper from '../EmployeeCardWrapper';

const descCss = css({
  fontSize: '14px',
  overflowY: 'auto'
});

interface Props extends User {}

const EmployeeCard = (props: Props) => {
  return (
    <EmployeeCardWrapper {...props}>
      <p css={descCss}>
        {props.profile?.description || ''}
      </p>
    </EmployeeCardWrapper>
  )
}

export default EmployeeCard;