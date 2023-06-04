import { User } from '@/src/types/user';
import { css } from '@emotion/react';
import Image from 'next/image';
import React from 'react'

const employeeRowCss = {
  row: css({
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    gap: '12px',
    cursor: 'pointer',
    
    '> img': {
      objectFit: 'contain',
      borderRadius: '100%',
      border: '1px solid #cac8c8',
      flexShrink: 0
    }
  }),
  username: css({
    width: '180px',
    flexShrink: 0,
    '> span': {
      display: 'block'
    }
  }),
  info: css({
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden',
    '> span': {
      display: 'block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    }
  })
}

interface Props extends Omit<User, 'description'> {
  onClickNext: () => void;
}

const EmployeeRow = ({
  profile: {firstname, lastname, location, department},
  profilePicture, onClickNext
}: Props) => {
  return (
    <div css={employeeRowCss.row} onClick={onClickNext}>
      <Image src={profilePicture} alt={`${firstname}-photo`} width={64} height={64} />
      <h3 css={employeeRowCss.username}>
        <span>{firstname}</span>
        <span>{lastname}</span>
      </h3>
      <div css={employeeRowCss.info}>
        <span>{location}</span>
        <span>{department}</span>
      </div>
    </div>
  )
}

export default EmployeeRow