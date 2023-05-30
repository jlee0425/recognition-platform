import { RecognitionValue } from '@/src/components/Chip';
import { User } from '@/src/types/user';
import React, { ReactNode, createContext, useCallback, useContext, useState } from 'react'

const useModalState = () => {
  const [user, setUser] = useState<User>();
  const [recogValues, setRecogValues] = useState<RecognitionValue[]>([]);

  const handleRemoveUser = useCallback(() => setUser(undefined), []);

  return {
    user,
    setUser,
    recogValues,
    setRecogValues,
    handleRemoveUser
  }
}

const RecogModalContext = createContext<ReturnType<typeof useModalState> | null>(null);

export const useRecogState = () => {
  const store = useContext(RecogModalContext);

  if (!store) {
    throw new Error('Recognition Modal not initialized');
  }

  return store;
};

const RecogModalProvider = ({ children }: { children: ReactNode }) => {
  return (
    <RecogModalContext.Provider value={useModalState()}>
      {children}
    </RecogModalContext.Provider>
  )
};

export default RecogModalProvider;