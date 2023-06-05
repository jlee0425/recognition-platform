import React, { Dispatch, SetStateAction } from 'react'
import { SectionType } from '../../page';
import { css } from '@emotion/react';
import { useMe } from '@/src/app/login/hooks/useMe';

const sectionCss = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  width: '50%',
  margin: '24px auto',
  fontSize: '28px',
  fontWeight: 400,
  '> span': {
    cursor: 'pointer',
    '&[aria-selected="true"]': {
      fontWeight: 700
    }
  }
});

interface Props {
  selected: SectionType;
  onSetSection: Dispatch<SetStateAction<SectionType>>;
}

export const SECTION_LIST = ['sent', 'received', 'team'] as const;
const SectionHeader = ({ selected, onSetSection }: Props) => {
  const { data: me } = useMe();
  const isManager = me?.manager === null;
  
  const handleClickSection = (section: SectionType) => () => {
    onSetSection(section);
  }
  return (
    <div css={sectionCss}>
      {SECTION_LIST.map((label, idx) => {
        if (!isManager && idx === 2) return null;
        return (
          <>
            {idx !== 0 && <span key={label + ' divider'}>/</span>}
            <span 
              key={label} 
              aria-selected={label === selected}
              onClick={handleClickSection(label)}
            >
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </span>
          </>
      )})}
    </div>
  )
}

export default SectionHeader