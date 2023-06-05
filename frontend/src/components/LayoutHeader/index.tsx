import React, { useEffect, useState } from 'react'
import { useLogoutMutation } from '../../app/login/hooks/useLogoutMutation';

const LayoutHeader = () => {
  const { handleLogout, isAuthenticated } = useLogoutMutation();

  const [label, setLabel] = useState('');

  /*
    workaround for hydration error
    reference: https://nextjs.org/docs/messages/react-hydration-error
  */ 
  useEffect(() => {
    if (isAuthenticated) setLabel('logout');
    return () => setLabel('');
  }, [isAuthenticated])

  return (
    <span onClick={handleLogout}>{label}</span>
  )
}

export default LayoutHeader