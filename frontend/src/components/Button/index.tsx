import { css } from '@emotion/react';
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

const baseCss = ({
  padding: '12px',
  outline: 'none',
  border: '1px solid #1556cf',
  borderRadius: '8px',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer'
})
const primary = css({
  ...baseCss,
  color: '#1556cf',
  backgroundColor: '#f7f7f7',
});

const secondary = css({
  ...baseCss,
  color: '#ececec',
  backgroundColor: '#1556cf',
  borderColor: '#ececec',
  '&[aria-disabled="true"]': {
    opacity: 0.4,
    pointerEvents: 'none'
  }
})

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
  buttonType?: 'primary' | 'secondary';
  label: string;
}

const Button = ({buttonType, label, ...props}: Props) => {
  return (
    <button css={buttonType === 'primary' ? primary : secondary} {...props}>{label}</button>
  )
}

export default Button;