import React, { useEffect } from 'react'
import { css } from '@emotion/react';

import EmployeeRow from './EmployeeRow';
import { useRecogState } from '../RecogModalContext';
import { User } from '@/src/types/user';
import { useEmployeeList } from '../../../hooks/useEmployeeList';

const listCss = {
  wrapper: css({
    padding: '20px 0',
    flex: 1,
    '> div:not(last-of-type)': {
      marginBottom: '20px',
    }
  }),
}

interface Props {
  onClickNext: () => void;
}

const EmployeeList = ({ onClickNext }: Props) => {
  const { data: employeeList } = useEmployeeList();
  const { setUser, handleRemoveValues } = useRecogState();

  const handleClickUser = (user: User) => () => {
    setUser(user);
    onClickNext();
  }

  useEffect(() => {
    // reset step2 on mount
    handleRemoveValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    return (
    <div css={listCss.wrapper}>
      {employeeList?.map(staff => (
        <EmployeeRow key={staff.id} {...staff} onClickNext={handleClickUser(staff)} />
      ))}
    </div>
  )
}

export default EmployeeList