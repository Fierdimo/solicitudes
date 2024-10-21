
export const htmlSendRequest = (subject) => {
  return `
    <body style="font-family:Arial,sans-serif;margin:0;padding:0;background-color:#f4f4f4;min-height:400px;display:flex;flex-direction: column;justify-content: center;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #001529; text-align: center;">BPM Discol</h1>
        <h2 style="color: #333333; text-align: start;">¡Nueva solicitud!</h2>
        <p style="color: #555555; line-height: 1.5;">
          Esperamos que este mensaje te encuentre bien. Queremos informarte que tiene una solicitud pendiente.
        </p>
        <p style="color: #555555; line-height: 1.5;">
          "<strong>${subject}</strong>".
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="http://localhost:3000" style="background-color: #1677ff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Ir al sitio</a>
        </div>
        <p style="color: #888888; font-size: 12px; text-align: center;">
          Este es un mensaje automático. Por favor, no responda a este correo.
        </p>
      </div>
    </body>`

}
export const htmlStateSwitchRequest = (subject, state, observations) => {
  return `
    <body style="font-family:Arial,sans-serif;margin:0;padding:0;background-color:#f4f4f4;min-height:400px;display:flex;flex-direction: column;justify-content: center;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #001529; text-align: center;">BPM Discol</h1>
        <h2 style="color: #333333; text-align: start;">¡Estado de solicitud!</h2>
        <p style="color: #555555; line-height: 1.5;">
          Esperamos que este mensaje te encuentre bien. Queremos informarte que la solicitud "<strong>${subject}</strong>" fue
        </p>
        <h4>${parseInt(state) === 1 ? "Rechazada" : "Aprobada"}</h4>
        ${parseInt(state) === 1 ? `
          <h3>Observaciones</h3>
          <p>${observations}</p>
          `: ""}
        <div style="text-align: center; margin: 20px 0;">
          <a href="http:localhost:3000" style="background-color: #1677ff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Ir al sitio</a>
        </div>
        <p style="color: #888888; font-size: 12px; text-align: center;">
          Este es un mensaje automático. Por favor, no responda a este correo.
        </p>
      </div>
    </body>`

}