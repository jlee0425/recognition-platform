import { User } from '@/src/types/user';
import { css } from '@emotion/react';
import Image from 'next/image';
import React, { ReactNode } from 'react'

const cardCss = {
  wrapper: css({
    width: '100%',
    height: '450px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: '8px',
    cursor: 'pointer',
    border: '1px solid #cac8c8',
    borderRadius: '8px',

    '&:hover': css({
      transform: 'scale(1.02)',
      transition: '0.1s ease-in-out',
    })
  }),
  photo: css({
    position: 'relative',
    borderRadius: '100%',
    border: '1px solid #cac8c8',
    width: '160px',
    height: '160px',
    marginBottom: '12px',
    flexShrink: 0,
    '> img': css({
      objectFit: 'contain'
    })
  }),
  name: css({
    fontSize: '24px',
  }),
  info: css({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    rowGap: '2px',
    fontSize: '16px',
    marginBottom: '8px',
    maxWidth: '75%',
    height: '60px',
  }),
}

interface Props extends Omit<User, 'id'> {
  children: ReactNode;
  onClick?: () => void;
}

const EmployeeCardWrapper = ({
  profile: {firstname, lastname, department, location},
  onClick,
  children
}: Props) => {
  return (
    <div css={cardCss.wrapper} onClick={onClick}>
      <div css={cardCss.photo}>
        <Image src='/logo.png' alt={`${firstname}-photo`} fill />
      </div>
      <div css={cardCss.name}>{firstname} {lastname}</div>
      <div css={cardCss.info}>
        <p>{location}</p>
        <p>{department}</p>
      </div>
      {children}
    </div>
  )
}

export default EmployeeCardWrapper