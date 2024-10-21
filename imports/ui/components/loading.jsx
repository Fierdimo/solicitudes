import React from 'react'
import { Spin } from 'antd'
export const Loading = () => {
  return (
    <>
      <Spin tip="Loading" size="large" style={{ position: "absolute", inset: "50vh" }} />
    </>
  )
}
