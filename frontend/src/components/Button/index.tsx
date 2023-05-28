import { css } from '@emotion/react';
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

const baseCss = ({
  padding: '12px',
  outline: 'none',
  border: '1px solid #0e9bca',
  borderRadius: '8px',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer'
})
const primary = css({
  ...baseCss,
  color: '#0e9bca',
  backgroundColor: '#ececec',
});

const secondary = css({
  ...baseCss,
  color: '#ececec',
  backgroundColor: '#0e9bca',
  borderColor: '#ececec',
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