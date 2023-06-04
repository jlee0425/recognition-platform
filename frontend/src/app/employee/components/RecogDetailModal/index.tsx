import { css } from '@emotion/react';
import { Props as ModalProps } from 'react-modal';
import Modal from '@/src/components/Modal/index';
import { Recognition, RecognitionValue } from '@/src/types/recognition';
import EmployeeCardWrapper from '../EmployeeCardWrapper/index';
import RecognitionChip from '@/src/components/RecognitionChip';

const mainCss = {
  wrapper: css({
    display: 'flex',
    flexDirection: 'column',
    rowGap: '12px',
    alignItems: 'center',
    overflow: 'hidden auto',
    padding: '20px 0'
  }),
  row: css({
    display: 'grid',
    gridTemplateColumns: '35% 65%',
    width: '500px',
    columnGap: '12px',
    '> span': {
      width: 'fit-content',
      height: 'fit-content'
    }
  })
};

interface Props extends Recognition, Pick<ModalProps, 'isOpen'> {
  onClose: () => void;
}

const RecogDetailModal = ({ isOpen, onClose, values, receiver }: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <EmployeeCardWrapper profile={receiver?.profile}>
        <div css={mainCss.wrapper}>
          {values?.map(({ id, value, detail }) => (
            <div key={id} css={mainCss.row}>
              <RecognitionChip chipType={value as RecognitionValue} />
              <p>{detail}</p>
            </div>
          ))}
        </div>
      </EmployeeCardWrapper>
    </Modal>
  )
}

export default RecogDetailModal