export const convertRolToString = (number) => {
  let str = '';
  switch (parseInt(number)) {
    case 1:
      str = 'General';
      break;
    case 2:
      str = 'Jefe';
      break;
    case 3:
      str = 'Director';
      break
    case 4:
      str = 'Auxiliar';
      break
    default:
      str = '?';
      break;
  }
  return str;
}

export const convertToFullName = (name_, lastname_) => {
  let name = name_ || "";
  let lastname = lastname_ || "";

  name = String(name).split(" ")[0];
  lastname = String(lastname).split(" ")[0];

  return `${name} ${lastname}`

}