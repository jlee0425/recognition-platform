import Button from '@/src/components/Button';
import RecognitionChip, { RECOGNITION_VALUES } from '@/src/components/RecognitionChip';
import { RecognitionValue } from '@/src/types/recognition';
import { css } from '@emotion/react';
import EmployeeCard from '../../EmployeeCard';
import { useRecogState } from '../RecogModalContext';

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

  return (
    <div css={recogValueCss.wrapper}>
      {user && <EmployeeCard {...user} />}
      <h3>Choose values from below</h3>
      <div css={recogValueCss.valueList}>
        {RECOGNITION_VALUES.map(val => (
          <RecognitionChip 
            key={val} 
            chipType={val} 
            selected={recogValues.includes(val)}
            onClick={handleSelectValue(val)}
          />
        ))}
      </div>
      <Button 
        label={`Give '${user?.profile.firstname.toUpperCase()}' Recognition`} 
        onClick={onClickNext} 
      />
    </div>
  )
}

export default RecogValue