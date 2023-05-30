import React, { useContext } from 'react'
import { css } from '@emotion/react';

import MockStaff from '@/src/__mock__/user.json';
import EmployeeRow from './EmployeeRow';
import { useRecogState } from '../RecogModalContext';
import { User } from '@/src/types/user';

const listCss = {
  wrapper: css({
    padding: '20px 0',
    flex: 1,
    '> div:not(last-of-type)': {
      marginBottom: '12px',
    }
  }),
}

interface Props {
  onClickNext: () => void;
}

const EmployeeList = ({ onClickNext }: Props) => {
  const { setUser } = useRecogState();

  const handleClickUser = (user: User) => () => {
    setUser(user);
    onClickNext();
  }

  return (
    <div css={listCss.wrapper}>
      {MockStaff.map(staff => (
        <EmployeeRow key={staff.id} {...staff} onClickNext={handleClickUser(staff)} />
      ))}
    </div>
  )
}

export default EmployeeList