import Button from '@/src/components/Button';
import { css } from '@emotion/react';
import React, { CSSProperties, useState } from 'react'
import ReactModal, { Props as ModalProps } from 'react-modal';
import EmployeeList from './EmployeeList';
import RecogValue from './RecogValue';
import RecogForm from './RecogForm';
import RecogModalProvider from './RecogModalContext';

const wrapperStyles = {
  width: '600px',
  height: '800px',
  background: '#fafafa',
  border: '1px solid #eceaea',
  borderRadius: '8px',
  top: '50%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column'
} as CSSProperties;

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

type RecogStep = 0 | 1 | 2;
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
    <ReactModal
    isOpen={isOpen}
    onRequestClose={handleClose}
    shouldCloseOnEsc
    shouldCloseOnOverlayClick
    style={{
      content: wrapperStyles,
    }}
    ariaHideApp={false}
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
              <RecogForm onCloseModal={onClose} />
            )}
          </RecogModalProvider>
        </main>
      </ReactModal>
  )
}

export default RecognitionModal