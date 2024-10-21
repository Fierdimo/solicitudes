import React, { useState } from 'react'

import { Editor } from "primereact/editor";
import { Modal, Button, message, Descriptions, Result, Skeleton, Space, Upload, Input, notification } from 'antd';

export const FormObservations = ({ onFinish, setOpen }) => {
  const [messageApi, contextHolder] = message.useMessage();

  //Almacenar las observaciones para el rechazo de la solicitud
  const [observations, setObservations] = useState('');

  const onFinish_ = (state, observations) => {
    onFinish(state, observations);
    setObservations('');
  }

  return (
    <>
      <Editor
        value={observations} onTextChange={(e) => setObservations(e.htmlValue)} style={{ height: '300px' }}
        headerTemplate={<>
          <div id="toolbar">
            <select class="ql-size">
              <option value="small"></option>
              <option selected></option>
              <option value="large"></option>
              <option value="huge"></option>
            </select>
          </div>
          <span className="ql-formats">
            <button className="ql-bold" aria-label="Bold"></button>
            <button className="ql-italic" aria-label="Italic"></button>
            <button className="ql-underline" aria-label="Underline"></button>
            <button class="ql-formats" aria-label="ql-formats"></button>
          </span>
        </>}
      />
      <div style={{ padding: "5px", display: "flex", justifyContent: "end", alignItems: "center", gap: ".5rem" }}>
        <Button color="danger" variant="outlined" onClick={() => {
          setOpen(false);
        }}>
          Cancelar
        </Button>
        <Button color="primary" variant="solid" onClick={() => {
          if (observations.trim() === "") {
            return messageApi.open({
              type: 'warning',
              content: '¡Ingrese la observación para poder continuar!',
            });
          }
          onFinish_(1, observations);
        }}>
          Continuar
        </Button>
      </div>
      {contextHolder}
    </>
  )
}
