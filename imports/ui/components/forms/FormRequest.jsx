import React, { useState } from 'react'
import {
  Input,
  Form, Select, Button, Upload,
  Popconfirm,
  message,
  Modal,
  Card,
} from 'antd';

const { Meta } = Card;
import {
  UploadOutlined,
  SendOutlined,
} from '@ant-design/icons';

import { useForm } from 'antd/es/form/Form';
import { Editor } from "primereact/editor";

import { Meteor } from 'meteor/meteor';

import { RequestTypes } from '../../utilities/RequestTypes.utilities';

export const FormRequest = ({ onFinish }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = useForm(null);

  //Contenido en html
  const [text, setText] = useState('');

  //Archivos
  const [fileList, setFileList] = useState([]);

  //Almacena el tipo de solicitud selecionado
  const [selecttedRequestType, setSelecttedRequestType] = useState({ title: "", value: 0 });
  //Alamancena el estado del modal si esta abierto o cerrado
  const [openSelecttedRequestType, setOpenSelecttedRequestType] = useState(false);

  /* Funcion para enviar los valores del formulario */
  const onSubmit = () => {
    let values = form.getFieldsValue();
    let message = "";

    /* Agregar texto segun el condicional */
    if (Meteor.user().profile.membreship.length > 1) {
      if (!values.leader) message = "Por favor seleccione el lider destinatario";
    }

    if (selecttedRequestType.value === 0) message = "Por favor seleccione el tipo de solicitud";
    if (!values.subject) message = "Por favor ingrese el asunto";



    //if (!values.receiver) message = "Por favor ingrese un destinatario";

    /* Condiconal para manejar el mensaje segun el texto asignado */
    if (String(message).trim() !== "") {
      messageApi.open({
        type: 'warning',
        content: message,
      });
      return;
    }

    if (Meteor.user().profile.membreship.length === 1) {
      values.leader = Meteor.user().profile.membreship[0];
    } else {
      values.leader = Meteor.user().profile.membreship[values.leader];
    }

    values["requestType"] = selecttedRequestType.value;
    values["content"] = text;
    values["files"] = fileList;

    onFinish(values);

  }
  const allowedExtensions = [
    "application/pdf", // PDF
    "application/msword", // Microsoft Word (.doc)
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // Microsoft Word (.docx)
    "application/vnd.ms-excel", // Microsoft Excel (.xls)
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Microsoft Excel (.xlsx)
    "image/png", // PNG Images
    "image/jpeg", // JPEG Images
    "image/jpg", // JPG Images
    "image/tiff", // TIFF Images
    "image/bmp", // BMP Images
    "application/vnd.oasis.opendocument.text", // OpenDocument Text (.odt)
    "application/vnd.oasis.opendocument.spreadsheet", // OpenDocument Spreadsheet (.ods)
  ];

  /* Props para la lectura de archivos */
  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    defaultFileList: fileList,
    beforeUpload: (file) => {
      if (!allowedExtensions.includes(file.type)) {
        message.error(`El archivo "${file.name}" no es soportado.`)
        return true;
      }
      setFileList([...fileList, file]);
      return false;
    },
    showDownloadIcon: true,
    downloadIcon: 'Download',
    showUploadList: {
      extra: ({ size = 0 }) => (
        <span
          style={{
            color: '#cccccc',
          }}
        >
          ({(size / 1024 / 1024).toFixed(2)}MB)
        </span>
      )
    }
  };

  return (
    <>
      <Form
        form={form}
      >
        {/* <Form.Item name={'receiver'} style={{ margin: "4px" }} >
          <Input placeholder='Correo destinatario' />
        </Form.Item > */}
        <Form.Item name={'subject'} style={{ margin: "4px" }}>
          <Input placeholder='Asunto' />
        </Form.Item>

        <Editor value={text} onTextChange={(e) => setText(e.htmlValue)} style={{ height: '300px' }} />

        <div style={{ display: "flex", gap: ".5rem", justifyContent: "space-between", flexWrap: "wrap", justifyItems: "center", padding: "10px", paddingLeft: "0" }}>
          <div style={{ display: "flex", gap: ".5rem", alignItems: "center", flexWrap: "wrap" }}>
            <Button color="primary" variant="outlined" onClick={() => {
              setOpenSelecttedRequestType(true);
            }}>{selecttedRequestType.value === 0 ? 'Seleccinar' : 'Cambiar'} tipo de solicitud</Button>
            <Meta title={selecttedRequestType.title}></Meta>
          </div>

          {Meteor.user().profile.membreship.length > 1 && (
            <Form.Item name={'leader'} label="Seleccionar" style={{ marginTop: "20px", maxWidth: "300px" }}>
              <Select placeholder={'Lider destinatario'} style={{ minWidth: "200px" }}>
                {Meteor.user().profile.membreship.map((item, i) => (
                  <Select.Option value={i}>{`Lider ${item[1]}`}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}
        </div>

        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Selecionar archivo</Button>
        </Upload>

        <Form.Item style={{ justifyContent: "end", display: "flex", marginTop: "20px" }}>
          <Popconfirm
            title="Confirmación"
            description="¿Continuar con el énvio?"
            onConfirm={onSubmit}
            okText="Si"
            cancelText="No"
          >
            <Button htmlType="submit" color="primary" variant="solid" >Enviar<SendOutlined /></Button>
          </Popconfirm>
        </Form.Item>

      </Form>
      {/* Modal para seleccionar el tipo de solicitud */}
      <Modal
        title="Seleccionar tipo de solicitud"
        centered
        open={openSelecttedRequestType}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        // onOk={() => setOpen(false)}
        onCancel={() => setOpenSelecttedRequestType(false)}
        width={800}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", justifyContent: "space-around" }}>
          {RequestTypes.map(item => (
            <Card
              key={item.value}
              hoverable
              style={{
                width: 240,
                backgroundColor: "#1677ff"
              }}
              onClick={() => {
                setSelecttedRequestType(item);
                setOpenSelecttedRequestType(false);
              }}
            >
              <h3 style={{ textAlign: "center", color: "white" }}>{item.title}</h3>
              <p style={{ textAlign: "center", color: "#104373" }}>{item.title}</p>
            </Card>
          ))}
        </div>
      </Modal>
      {contextHolder}
    </>
  )
}
