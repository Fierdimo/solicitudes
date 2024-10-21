export const getFormattedDate = (date) => {
  const d = new Date(date);

  const day = String(d.getDate()).padStart(2, '0'); // Obtener el día y asegurarse de que tenga dos dígitos
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Obtener el mes (los meses comienzan en 0, por lo que sumamos 1)
  const year = d.getFullYear(); // Obtener el año

  return `${day}/${month}/${year}`;
};


export const getFormattedTime = (date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
