import { ReconitionValue } from '@/src/types/recognition';
import { css } from '@emotion/react';
import React from 'react'

const chipCss = css({
  padding: '2px 4px',
  border: '1px solid',
  borderRadius: '4px',
});

const CHIP_COLORS: Record<ReconitionValue, string> = {
  LEADER: '#ff0101',
  PERFORMER: '#0633ff',
  TEAM_PLAYER: '#344472',
  EASY_GOING: '#4e5307',
  LISTENER: '#5279b3',
  LEARNER: '#ff5a91',
  POSITIVE: '#0d6d6d',
  CONSTRUCTIVE: '#bd5353'
};

interface Props {
  chipType: ReconitionValue;
}

const Chip = ({ chipType }: Props) => {
  return (
    <span 
      css={chipCss} 
      style={{
        borderColor: CHIP_COLORS[chipType],
        color: CHIP_COLORS[chipType]
      }}
    >
      {chipType}
    </span>
  )
}

export default Chip;