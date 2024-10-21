export const downloadBase64File = (base64, fileName) => {
  // Decodifica la cadena Base64
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  // Crea un Blob a partir del contenido
  const blob = new Blob([byteArray], { type: 'application/octet-stream' });

  // Crea un enlace de descarga temporal
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;

  // Simula el clic para descargar el archivo
  document.body.appendChild(link);
  link.click();

  // Elimina el enlace temporal
  document.body.removeChild(link);
}


export const base64ToFileWithContentType = (base64WithPrefix, fileName) => {
  // Dividimos la cadena base64 en el content type y los datos base64 reales
  const [prefix, base64Data] = base64WithPrefix.split(',');

  // Extraemos el content type del prefijo
  const contentType = prefix.match(/:(.*?);/)[1];

  // Decodificamos los datos base64
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  // Creamos un Blob a partir de los datos decodificados
  const blob = new Blob([byteArray], { type: contentType });

  // Convertimos el Blob en un archivo
  return new File([blob], fileName, { type: contentType });
}
