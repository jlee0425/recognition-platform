import Button from '@/src/components/Button';
import { css } from '@emotion/react';
import React, { useCallback, useEffect } from 'react'
import { useRecogState } from '../RecogModalContext';
import EmployeeCard from '../../EmployeeCard';
import Chip, { RECOGNITION_VALUES, RecognitionValue } from '@/src/components/Chip';

const recogValueCss = {
  wrapper: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    maxWidth: '70%',
    heght: '100%',
    margin: '0 auto',

    '> div:first-of-type': {
      border: 'none',
      flex: 1,
      pointerEvents: 'none',
    },
    '> h3': {
      margin: '20px 0 30px'
    },
    '> button': {
    }
  }),
  valueList: css({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '30px',
    '> span': {
      cursor: 'pointer',
    }
  })
}

interface Props {
  onClickNext: () => void;
}

const RecogValue = ({ onClickNext }: Props) => {
  const { user, recogValues, setRecogValues } = useRecogState();

  const handleSelectValue = (val: RecognitionValue) => () => {
    setRecogValues(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
  }

  useEffect(() => {
    return () => setRecogValues([]);
  }, [setRecogValues]);

  return (
    <div css={recogValueCss.wrapper}>
      {user && <EmployeeCard {...user} />}
      <h3>Choose values from below</h3>
      <div css={recogValueCss.valueList}>
        {RECOGNITION_VALUES.map(val => (
          <Chip 
            key={val} 
            chipType={val} 
            selected={recogValues.includes(val)}
            onClick={handleSelectValue(val)}
          />
        ))}
      </div>
      <Button 
        label={`Give '${user?.username.firstName.toUpperCase()}' Recognition`} 
        onClick={onClickNext} 
      />
    </div>
  )
}

export default RecogValue