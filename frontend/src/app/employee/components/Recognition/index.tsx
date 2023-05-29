'use client';

import { ReconitionValue } from '@/src/types/recognition';
import { User } from '@/src/types/user';
import { css } from '@emotion/react';
import React from 'react';
import EmployeeCardWrapper from '../EmployeeCardWrapper';
import Chip from '@/src/components/Chip';

const chips = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
});

interface Props extends Omit<User, 'description'>{
  recognizedValues: ReconitionValue[];
}

const Recongnition = ({recognizedValues, ...props}: Props) => {
  return (
    <EmployeeCardWrapper {...props}>
      <div css={chips}>
        {recognizedValues.map(value => (
          <Chip key={`${props.username}-${value}`} chipType={value} />
          ))}
      </div>
    </EmployeeCardWrapper>
  )
}

export default Recongnition