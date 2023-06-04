import React, { CSSProperties, ReactNode } from 'react'
import ReactModal, { Props } from 'react-modal';

const contentStyles = {
  width: '600px',
  height: 'fit-content',
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

export interface ModalProps extends Pick<Props, 'isOpen'> {
  onClose: () => void;
  children: ReactNode;
  wrapperStyle?: CSSProperties;
}

const Modal = ({isOpen, onClose, wrapperStyle, children}: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      style={{
        content: {
          ...contentStyles,
          ...wrapperStyle
        },
      }}
      ariaHideApp={false}
    >
      {children}
    </ReactModal>
  )
}

export default Modal