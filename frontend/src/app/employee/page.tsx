'use client';

import React, { useState } from 'react'

import Button from '@/src/components/Button';
import { css } from '@emotion/react';
import Recongnition from './components/Recognition';
import RecognitionModal from './components/RecognitionModal';
import { useRecognitionList } from './hooks/useRecognitionList';
import { Recognition, RecognitionValue } from '@/src/types/recognition';

const pageCss = {
  recogSection: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b5fff',
    color: 'white',
    width: '100%',
    height: '30%',
    
    '> h3': css({
      fontSize: '24px',
      marginBottom: '12px'
    }),
    '> p': css({
      marginBottom: '44px',
    })
  }),
  listSectionTitle: css({
    textAlign: 'center',
    margin: '24px 0',
    fontSize: '28px'
  }),
  listSection: css({
    maxWidth: '1024px',
    margin: '0 auto',
    display: 'grid',
    placeItems: 'center',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
    paddingBottom: '24px'
  }),
}

const EmployeePage = () => {
  const { data } = useRecognitionList();
  const [isOpenModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <>
      <section css={pageCss.recogSection}>
        <h3>Give applaudes to your fellow employees.</h3>
        <p>Amplify key behaviors and company values while fostering connection across distributed teams.</p>
        <Button 
          label="Click to Applaude" 
          onClick={handleOpenModal}
          type="button" 
          buttonType='primary'
        />
      </section>
      <h3 css={pageCss.listSectionTitle}>Recognitions</h3>
      <section css={pageCss.listSection}>
        {data?.map(({ receiver, values, ...props }: Recognition) => (
          <Recongnition 
            key={props.id} 
            {...props} 
            profile={receiver}
            values={values.map(v => v.value as RecognitionValue)}
          />
        ))}
      </section>
      <RecognitionModal 
        isOpen={isOpenModal}
        onClose={handleCloseModal}
      />
    </>
  )
}

export default EmployeePage