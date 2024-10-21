import React from 'react'

import {
  Tag
} from 'antd';

export const RequestState = ({ state }) => {

  switch (parseInt(state)) {
    case 0:
      return (
        <Tag color="processing">En proceso</Tag>
      )
    case 1:
      return (
        <Tag color="error">Rechazada</Tag>
      )
    case 2:
      return (
        <Tag color="success">Aprobada</Tag>
      )
    default:
      return (
        <Tag color="error">
          ¿?
        </Tag>
      )
      break;
  }

}
