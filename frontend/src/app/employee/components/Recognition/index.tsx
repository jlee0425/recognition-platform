'use client';

import { User } from '@/src/types/user';
import { css } from '@emotion/react';
import React from 'react';
import EmployeeCardWrapper from '../EmployeeCardWrapper';
import RecognitionChip from '@/src/components/RecognitionChip';
import { RecognitionValue } from '@/src/types/recognition';
import { usePathname, useRouter } from 'next/navigation';

const chips = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '4px',
});

interface Props extends Omit<User, 'description'>{
  values: RecognitionValue[];
}

const Recongnition = ({values, ...props}: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClickRecog = () => {
    router.replace(pathname + `?detail=${props.id}`)
  }
  return (
    <EmployeeCardWrapper {...props} onClick={handleClickRecog}>
      <div css={chips}>
        {values.map(value => (
          <RecognitionChip key={`${props.id}-${value}`} chipType={value} />
          ))}
      </div>
    </EmployeeCardWrapper>
  )
}

export default Recongnition