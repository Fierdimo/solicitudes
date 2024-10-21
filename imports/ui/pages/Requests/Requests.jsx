import React, { useEffect, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor';

import { Modal, Button, message, Descriptions, Result, Skeleton, Space, Upload, Input, notification } from 'antd';

import { PlusCircleOutlined, SmileOutlined } from '@ant-design/icons';


import './index.css';

import { consultRequestById, getRequests, sendRequest, stateSwitchRequest } from '../../services/private/requests.services';

import { getFormattedDate, getFormattedTime } from '../../utilities/Date.utilities';


import { HeaderP } from '../../components/layouts/Header';
import { RequestsList } from '../../components/RequestsList';
import { FormRequest } from '../../components/forms/FormRequest';
import { ContentViewRequest } from '../../components/ContentViewRequest';
import { convertToFullName } from '../../adapters/users.adapters';
import { RequestState } from '../../components/RequestState';

import { Requests as RequestCollection } from "../../../api/requestConnection/requestsCollection"

import { RequestTypes } from '../../utilities/RequestTypes.utilities';
import { FormObservations } from '../../components/forms/FormObservations';
import { FilesView } from '../../components/FilesView/FilesView';

export const Requests = () => {
  const [messageApi, contextHolder] = message.useMessage();

  //Variable para manejar el estado el modal para el envio de solcitudes
  const [open, setOpen] = useState(false);

  //varible para manejar el estado del modal de las observacion del rechazo de la solicitud
  const [openObservations, setOpenObservations] = useState(false);

  //Almacena el listado de solicitudes
  const [requests, setRequests] = useState([]);
  // Alamacena el estado de la carga de las solicitudes
  const [loading, setLoading] = useState(false);

  //Almacena el total de solicitudes
  const [totalRequests, setTotalRequests] = useState(0);

  //Almacena la solicitud seleccionada
  const [request, setRequest] = useState(null);
  //Almacena el estado de la carga de la solicitud selecionada
  const [requestLoading, setRequestLoading] = useState(false);



  const loadMoreData = () => {
    if (loading) {
      return;
    }

    getRequests(requests[requests.length - 1].createdAt).then((res) => {
      setRequests([...requests, ...(res.result)]);
      setTotalRequests(res.count);
    })
  }

  //Tracker para el monitoreo cambios en la base de datso
  const trackerRequests = useTracker(() => {
    Meteor.subscribe('allRequests');
    //Se realiza una consulta a la base de datos
    return RequestCollection.find({}, { fields: {} }).fetch();
  }, []);

  //Tiene como función de ejecutar cada cuando la variable "trackerRequests" se active
  useEffect(() => {
    if (trackerRequests) {
      setLoading(true);

      //Realiza la consulta de las solicitudes
      getRequests().then(res => {
        setRequests(res.result);
        setTotalRequests(res.count);
      });

      setLoading(false);

      if (request !== null) {
        consultRequestById_(request._id);
      }

    }
  }, [trackerRequests]);


  //Funcion para el envia de las solicitudes
  const sendRequest_ = (values) => {

    setLoading(true);
    //Se crea el objeto de los valores que se enviaran al la API
    let data = {
      leader: values.leader,
      requestType: values.requestType,
      subject: values.subject,
      content: values.content,
      files: values.files
    }

    // Función para para realizar el envio de los datos
    // sendRequest(values.leader, values.requestType, values.subject, values.content, values.files).then(res => {
    sendRequest(data).then(res => {

      messageApi.open({
        type: 'success',
        content: 'Se envió la solicitud correctamente',
      });
      setOpen(false); // Cierra el modal del envio de solicitudes

      //Realiza la consulta de las solicitudes
      getRequests().then(res => {
        setRequests(res.result);
        setTotalRequests(res.count);
      });
    }).catch(err => {
      messageApi.open({
        type: 'error',
        content: 'Se a producido un problema en el envio de la solicitud',
      });
    })


  }

  //Función para consultar una solicitud por el "_id"
  const consultRequestById_ = (_id) => {
    setRequestLoading(true); // se almacena un volor "true" como estado "Cargando"

    //Función para consultar la solicitud
    consultRequestById(_id).then(res => {

      setRequest(res); //Se almacena la respuesta
      setRequestLoading(false); // Se almacena un valor "false" como estado "No cargando"
    })
  }


  //Función para cambiar el estado de la solicitud
  const stateSwitchRequest_ = (state, observations) => {
    //Función para enviar la soliciutd y a su vez se le envia los parametros necesarios
    stateSwitchRequest(request._id, state, observations).then(res => {

      //Realiza la consulta de las solicitudes
      getRequests().then(res => {
        setRequests(res.result);
        setTotalRequests(res.count);
      });

      //Se crea para una variable para alamcenar la informacion actual para luego cambiar el estado de la solicitud
      let tempRequest = request;
      tempRequest.state = state;
      setRequest(tempRequest);

      //Se valida que el estado se igual a rechazado para cambiar los valores de las varibles referente a las observaciones
      if (parseInt(state) === 1) {
        setOpenObservations(false);
      }
      setOpenObservations(false);

    })
  }


  return (
    <div className="requests">
      <HeaderP></HeaderP>
      <main>
        <RequestsList loading={loading} data={requests} maxData={totalRequests} loadMoreData={loadMoreData} selecttedRequest={consultRequestById_} />
        <div className="details-requests">
          {requestLoading === true && (
            <div style={{ flex: 1, overflowY: "auto" }}>
              <div style={{ display: "flex", gap: "2rem" }}>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
              </div>
              <br></br>
              <Skeleton active />
              <br></br>
              <br></br>
              <Skeleton active />
            </div>)}
          {request !== null && requestLoading === false && (
            <><Descriptions title="Solicitud" items={[
              {
                style: { width: "180px" },
                key: '1',
                label: 'De',
                children: convertToFullName(request?.senderUser[0].profile.name, request?.senderUser[0].profile.lastname),
              },
              {
                style: { width: "180px" },
                key: '1',
                label: 'Para',
                children: convertToFullName(request?.receiverUser[0].profile.name, request?.receiverUser[0].profile.lastname),
              },
              {
                style: { width: "280px" },
                key: '2',
                label: 'Correo',
                children: request.senderUser[0].profile.email,
              },
              {
                key: '3',
                label: 'Fecha de énvio',
                children: getFormattedDate(request.createdAt),
              },
              {
                key: '4',
                label: 'Hora de énvio',
                children: getFormattedTime(request.createdAt),
              },
              {
                style: { width: "100px" },
                key: '5',
                label: 'Estado de la solicitud',
                children: <RequestState state={request.state} />,
              },
              {
                style: { width: "580px" },
                key: '6',
                label: 'Tipo de la solicitud',
                children: (RequestTypes.map(item => {
                  if (item.value === request.requestType) {
                    return item.title;
                  }
                })),
              }
            ]} style={{ borderBottom: "1px solid #E9E9E9FF", paddingBottom: "10px" }} />
              <h4 style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%',
                padding: "10px"
              }} title={request.subject}>{request.subject}</h4>
              <div className='details'>
                <ContentViewRequest value={request.content} />
                {request.files.length > 0 && (
                  <>
                    <br></br>
                    <br></br>
                    <h4 >Adjuntos</h4>
                    <FilesView files={request.files} />
                    <br></br>

                  </>
                )}
                {request.observations !== "" && (
                  <>
                    <br></br>
                    <br></br>
                    <h4 >Observaciones</h4>
                    <br></br>
                    <ContentViewRequest value={request.observations} />
                  </>
                )}
              </div>
            </>
          )}
          {request === null && requestLoading === false && (
            <div style={{ flex: "1", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Result
                icon={<SmileOutlined />}
                title="¡Bienvenid@!"
              />
            </div>
          )}
          <div style={{ padding: "10px", color: "#001529", display: "flex", justifyContent: "end", borderTop: "1px solid #E9E9E9FF" }}>
            {request !== null && Meteor.user().profile.membreship.some(f => f[0] === 'lider') && (
              <div style={{ flex: "1", display: "flex", justifyContent: "start", gap: ".5rem" }}>
                {request.state === 0 && requestLoading === false && (
                  <>
                    <Button color="danger" variant="outlined" onClick={() => {
                      setOpenObservations(true);
                    }}>
                      Rechazar solicitud
                    </Button>
                    <Button color="primary" variant="solid" onClick={() => stateSwitchRequest_(request._id, 2)}>
                      Aprobar solicitud
                    </Button>
                  </>
                )}
                {requestLoading === true && request.state === 0 && (
                  <>
                    <Skeleton.Input active={true} size={"Default"} />
                    <Skeleton.Input active={true} size={"Default"} />
                  </>
                )}
              </div>
            )}
            <Button color="primary" variant="outlined" onClick={() => setOpen(true)}>
              <PlusCircleOutlined />
              Crear nuevo
            </Button>
          </div>
        </div >
      </main >
      {/* Modal para ingresar las observaciones */}
      < Modal
        title="Observaciones del rechazo de solicitud"
        centered
        open={openObservations}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        // onOk={() => setOpen(false)}
        onCancel={() => setOpenObservations(false)}
        width={800}
      >
        <FormObservations onFinish={stateSwitchRequest_} setOpen={setOpenObservations} />
      </Modal >
      {/* Modal para el envio de las solicitudes */}
      < Modal
        title="Envio de solicitud"
        centered
        open={open}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        // onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1300}
      >
        <div className='editor'>
          <FormRequest onFinish={sendRequest_} />
        </div>
      </Modal >

      {contextHolder}
    </div >
  )
}
