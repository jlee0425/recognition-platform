import React, { useEffect, useState } from 'react'
import { useLogoutMutation } from '../../app/login/hooks/useLogoutMutation';
import { css } from '@emotion/react';

const logoutBtn = css({
  cursor: 'pointer'
});

const LayoutHeader = () => {
  const { handleLogout, isAuthenticated } = useLogoutMutation();

  const [label, setLabel] = useState('');

  /*
    workaround for hydration error
    reference: https://nextjs.org/docs/messages/react-hydration-error
  */ 
  useEffect(() => {
    if (isAuthenticated) setLabel('LOG OUT');
    return () => setLabel('');
  }, [isAuthenticated])

  return (
    <span onClick={handleLogout} css={logoutBtn}>{label}</span>
  )
}

export default LayoutHeader