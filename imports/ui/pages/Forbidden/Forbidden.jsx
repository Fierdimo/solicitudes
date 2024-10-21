import React from 'react'
import { Button, Result } from 'antd';
export const Forbidden = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle={<h2>Lo sentimos, no está autorizado a acceder a esta página.</h2>}
      extra={<></>}
    />
  )
}
