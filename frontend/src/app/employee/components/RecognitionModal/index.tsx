import Button from '@/src/components/Button';
import Modal from '@/src/components/Modal';
import { css } from '@emotion/react';
import { useState } from 'react';
import { Props as ModalProps } from 'react-modal';
import EmployeeList from './EmployeeList';
import RecogCompleted from './RecogCompleted';
import RecogForm from './RecogForm';
import RecogModalProvider from './RecogModalContext';
import RecogValue from './RecogValue';

const modalProps = {
  modalHeader: css({
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '> button': {
      padding: '4px 6px',
      '&[aria-disabled="true"]': {
        opacity: 0.3,
        pointerEvents: 'none'
      }
    }
  }),
  modalBody: css({
    width: '100%',
    margin: '0 auto'
  }),
}

type RecogStep = 0 | 1 | 2 | 3;
interface Props extends Pick<ModalProps, 'isOpen'> {
  onClose: () => void;
}

const RecognitionModal = ({ isOpen, onClose }: Props) => {
  const [recogStep, setRecogStep] = useState<RecogStep>(0);

  const handleClose = () => {
    setRecogStep(0);
    onClose();
  }

  const handleClickPrev = () => setRecogStep(prev => (prev - 1) as RecogStep);
  const handleClickNext = () => setRecogStep(prev => (prev + 1) as RecogStep);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      wrapperStyle={{
        height: '800px',
      }}
    >
      <header css={modalProps.modalHeader}>
        <Button 
          buttonType='primary'
          label="back" 
          aria-disabled={recogStep === 0} 
          onClick={handleClickPrev} 
        />
        <Button 
          buttonType='primary'
          label="close" 
          onClick={handleClose} 
        />
      </header>
      <main css={modalProps.modalBody}>
        <RecogModalProvider>
          {recogStep === 0 && (
            <EmployeeList onClickNext={handleClickNext}/>
          )}
          {recogStep === 1 && (
            <RecogValue onClickNext={handleClickNext} />
          )}
          {recogStep === 2 && (
            <RecogForm onClickNext={handleClickNext} />
          )}
          {recogStep === 3 && (
            <RecogCompleted />
          )}
        </RecogModalProvider>
      </main>
    </Modal>
  )
}

export default RecognitionModal