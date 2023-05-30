import { css } from '@emotion/react';
import React, { HTMLAttributes } from 'react'
import {DetailedHTMLProps} from 'react';

export const RECOGNITION_VALUES = [
  'LEADER', 'PERFORMER', 'TEAM_PLAYER', 'EASY_GOING', 'LISTENER', 'LEARNER', 'POSITIVE', 'CONSTRUCTIVE'
] as const;

export type RecognitionValue = typeof RECOGNITION_VALUES[number];

const chipCss = css({
  padding: '2px 4px',
  border: '1px solid',
  borderRadius: '4px',
});

export const CHIP_COLORS: Record<RecognitionValue, string> = {
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
  chipType: RecognitionValue;
  selected?: boolean;
  onClick: () => void;
}

const Chip = ({ chipType, selected, onClick }: Props) => {
  return (
    <span 
      css={chipCss} 
      style={{
        borderColor: CHIP_COLORS[chipType],
        color: selected ? '#ececec' : CHIP_COLORS[chipType],
        backgroundColor: selected ? CHIP_COLORS[chipType] : 'transparent',
      }}
      onClick={onClick}
    >
      {chipType}
    </span>
  )
}

export default Chip;