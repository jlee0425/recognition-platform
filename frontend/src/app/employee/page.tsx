'use client';

import { css } from '@emotion/react';
import React from 'react'

const pageCss = {
  recogSection: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b5fff',
    color: 'white',
    width: '100%',
    height: '30%'
  }),
  listSection: css({
    display: 'grid',
    placeItems: 'center',
    gridTemplateColumns: 'repeat(3, 1fr)',
  }),
}

interface Props {}

const EmployeePage = (props: Props) => {
  return (
    <>
      <section css={pageCss.recogSection}>
        <h3>Give an applaude to your fellow employee.</h3>
      </section>
      <section css={pageCss.listSection}>
        List Section
      </section>
    </>
  )
}

export default EmployeePage