'use client';

import { useState } from 'react';

import Button from '@/src/components/Button';
import { Recognition, RecognitionValue } from '@/src/types/recognition';
import { css } from '@emotion/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import RecogDetailModal from './components/RecogDetailModal/index';
import Recongnition from './components/Recognition';
import RecognitionModal from './components/RecognitionModal';
import SectionHeader, { SECTION_LIST } from './components/SectionHeader';
import { useRecognitionList } from './hooks/useRecognitionList';
import NoList from './components/NoList/index';

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
  listSection: css({
    maxWidth: '1024px',
    margin: '0 auto',
    display: 'grid',
    placeItems: 'center',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
    paddingBottom: '24px'
  }),
  sectionTitle: css({
    fontSize: '28px',
    textAlign: 'center',
    marginTop: '20px'
  })
}

export type SectionType = typeof SECTION_LIST[number];
const RECOGNITION_MODAL_KEY = 'detail';
const EmployeePage = () => {
  const [section, setSection] = useState<SectionType>('sent');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: recogList } = useRecognitionList(section);
  

  const detailId = searchParams.get(RECOGNITION_MODAL_KEY);
  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

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
      <h3 css={pageCss.sectionTitle}>Recognitions</h3>
      <SectionHeader selected={section} onSetSection={setSection}/>
      {(recogList || []).length > 0 ? (
        <section css={pageCss.listSection}>
            {recogList.map(({ receiver, values, ...props }: Recognition) => (
              <Recongnition 
                key={props.id} 
                profile={receiver.profile}
                values={values.map(v => v.value as RecognitionValue)}
                {...props}
              />
            ))}
        </section>
      ) : (
        <NoList />
      )}
      <RecognitionModal 
        isOpen={isOpenModal}
        onClose={handleCloseModal}
      />
      {detailId && (
        <RecogDetailModal
          isOpen={searchParams.has(RECOGNITION_MODAL_KEY)}
          onClose={() => router.replace(pathname)}
          {...recogList?.find((d: Recognition) => d.id === Number(detailId))}
        />
      )}
    </>
  )
}

export default EmployeePage