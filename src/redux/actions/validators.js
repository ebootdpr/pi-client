/* eslint-disable no-unused-vars */
const validActivitiesAtts = ['name', 'season', 'difficulty', 'duration'];
const validActivitiesAttsAct_ = ['act_name', 'act_season', 'act_difficulty', 'act_duration'];
const validCountryAtts = ['cca3', 'name', 'flags', 'continents', 'capital', 'subregion', 'area', 'population']
const validContinents = ['Europe', 'Asia', 'North America', 'Africa', 'Antarctica', 'South America', 'Oceania', 'Other']
const validSeasons = ['Verano', 'Otoño', 'Invierno', 'Primavera']
function strIsNumeric(str) {
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (!isNum(code)) {
      return false;
    }
  }
  return true
}
function isNum(value, skip = false) {
  if (skip) return false;
  if (value > 47 && value < 58) return true;
  return false
}
function ucase(value) {
  if (value > 64 && value < 91) return true;
  return false
}
function tildes(value) {
  if (value > 159 && value < 166) return true;
  if (value === 144 || value === 130 || value === 241) return true;
}
function lcase(value) {
  if (value > 96 && value < 123) return true;

  return false
}
function isAlphaNumeric(inputStr, ignoreUnits = false, isCCA3 = false) {
  let code = inputStr.charCodeAt(0);
  if (isCCA3 && inputStr.length !== 3)
    return [false, 'CCA3 Debe ser igual de longitud de 3 caracteres'];
  if (!ignoreUnits) {
    if (!ucase(code)) return [false, 'Debe comenzar con mayusculas'];
    if (inputStr.length < 3) return [false, 'Debe ser mayor a 3 caracteres']
  }
  const arrayDeStrings = inputStr.split(' ')
  console.log(arrayDeStrings);
  for (const str of arrayDeStrings) {
    if (!ignoreUnits || isCCA3) if (!str)
      return [false, 'No debe contener multiples espacios o terminar en espacio']
    for (let i = 0; i < str.length; i++) {
      code = str.charCodeAt(i);
      if (
        !isNum(code, isCCA3) && // numeric (0-9)
        !ucase(code) && // upper alpha (A-Z)
        !lcase(code) &&
        !tildes(code)) { // lower alpha (a-z)
        if (isCCA3)
          return [false, 'Debe ser alfabético, sin números. Caracter inválido:' + String.fromCharCode(code)];
        return [false, 'Debe ser alfanumérico, caracter inválido:' + String.fromCharCode(code)];
      }
    }
  }
  return [true, 'Validado'];
}
export const validateBodyActivities = (inputs) => {
  const errors = {}
  if (!isAlphaNumeric(inputs.name)[0]) errors.name = ('Nombre ' + isAlphaNumeric(inputs.name)[1]);
  if (inputs.name==="") errors.name = ('Escriba un nombre' );

  if (!isAlphaNumeric(inputs.season)[0]) errors.season = ('Estacion ' + isAlphaNumeric(inputs.season)[1]);
  if (!validSeasons.includes(inputs.season)) errors.season = ('Estacion incorrecta, valid seasons: ' + validSeasons);
  if (!strIsNumeric(inputs.duration)) errors.duration = ('Duracion debe ser un numero');
  console.log((inputs.difficulty));
  if (isNaN(parseInt(inputs.difficulty)))
    errors.difficulty = 'Dificultad debe ser numerico';
  else {
    if (parseInt(inputs.difficulty) < 1) errors.difficulty = 'Dificultad no está entre 1 y 5 ';
    if (parseInt(inputs.difficulty) > 5) errors.difficulty = 'Dificultad no está entre 1 y 5 ';
  }
  if (isNaN(parseInt(inputs.duration)))
    errors.duration = 'Duracion debe ser un numero ';
  else if (!parseInt(inputs.duration) > 0)
    errors.duration = ('Duracion debe ser mayor a 0');
  return errors
}
const validateBodyForBulk = (input) => {
  if (!Array.isArray(input)) throw new Error('Body debe ser un array de paises a crear');
  if (input.length === 0) throw new Error('Debe contener al menos un pais');
  if (Object.keys(input[0]).length === 0) throw new Error('Debe contener un pais no vacío')
}
const validateString = (input) => {
  const queryKeys = Object.keys(input)
  for (const key of queryKeys) {
    if (typeof input[key] !== 'string')
      throw new Error('Uno de los valore recibidos no es tipo string: ' + key);
  }

}
const validateCCA3 = (str) => {
  const status = isAlphaNumeric(str, true, true)
  if (!status[0])
    throw new Error(status[1]);

}
const validateQuery = (input) => {
  const queryKeys = Object.keys(input)
  for (const key of queryKeys) {
    if (!validCountryAtts.includes(key))
      throw new Error('Uno de los query es inválido, recibido: ' + queryKeys + ' validos:' + validCountryAtts);
    if (input[key] && !isAlphaNumeric(input[key], true)[0])
      throw new Error(isAlphaNumeric(input[key])[1]);
  }

  if (input.continents && !validContinents.includes(input.continents))
    throw new Error('Debe escribir el nombre completo del continente y debe ser uno de estos: ' + validContinents);
  if (input.area && !strIsNumeric(input.area))
    throw new Error('area debe ser un número');
  if (input.population && !strIsNumeric(input.population))
    throw new Error('population debe ser un número');
  console.log('validacion OK');
  return true;
};
const validateCountry = (input) => {
  const queryKeys = Object.keys(input)
  for (const key of queryKeys) {
    if (!validCountryAtts.includes(key))
      throw new Error('Clave inválida:' + key);
  }
  if (!input.cca3 || !input.name || !input.flags || !input.capital || !input.continents)
    throw new Error('cca3, name, flags, continents, y capital no deben ser nulos!');
  if (!isAlphaNumeric(input.cca3, true)[0])
    throw new Error('cca3 ' + isAlphaNumeric(input.name, true)[1]);
  if (input.cca3.length !== 3 || input.cca3 !== input.cca3.toUpperCase())
    throw new Error('cca3 must be uppercase and length 3');
  if (!isAlphaNumeric(input.name)[0]) throw new Error('name: ' + isAlphaNumeric(input.name)[1]);
  if (!isAlphaNumeric(input.capital)[0]) throw new Error('capital: ' + isAlphaNumeric(input.capital)[1]);
  if (input.subregion && !isAlphaNumeric(input.subregion)[0]) throw new Error('subregion: ' + isAlphaNumeric(input.subregion)[1]);
  if (input.continents && !validContinents.includes(input.continents))
    throw new Error('Debe escribir el nombre completo del continente y debe ser uno de estos: ' + validContinents);
  if (input.area && !strIsNumeric(input.area))
    throw new Error('area debe ser un número');
  if (input.population && !strIsNumeric(input.population))
    throw new Error('population debe ser un número');
  return true;
};
const validateAssignBody = (reqbody) => {
  if (!Array.isArray(reqbody) || !Array.isArray(reqbody[0]) || !Array.isArray(reqbody[1]) || reqbody.length !== 2)
    throw new Error('Debe enviar un array de longitud 2 que contengan 0: cca3 array de paises y 1: array de ID de actividades');
  for (const cca3 of reqbody[0]) {
    validateCCA3(cca3)
  }
  for (const id of reqbody[1]) {
    if (!strIsNumeric('' + id + '')) throw new Error('la id debe ser numerica, se recibió ' + id);
  }
}

const validatePageRoute = (params, querys, body) => {
  let page = params.pgnumber, whereObj = null, whereObjIncludes = null, orden = [['cca3', 'ASC']]
  // eslint-disable-next-line no-prototype-builtins
  if (body.hasOwnProperty('0')) {
    if (!Array.isArray(body) && !(body.length === 1) && typeof body[0][1] !== 'string' && typeof body[0][0] !== 'string')
      throw new Error('Body inválido, debe ser un array con 2 strings como elementos')
    if (!validCountryAtts.includes(body[0][0]))
      throw new Error('El primer elemento debe ser uno de estos ' + validCountryAtts)
    if (!['ASC', 'DESC'].includes(body[0][1]))
      throw new Error('body debe ser ASC o DESC')
    orden = body
  }
  if (isNaN(page)) throw new Error('Debe ingresar un valor numérico');

  //? Checkea y filtra querys para generar los where
  const keyQuerys = Object.keys(querys)
  const whereKeys = keyQuerys.filter(key => validCountryAtts.includes(key))
  const whereIncludeKeys = keyQuerys.filter(key => validActivitiesAttsAct_.includes(key))
  console.log(whereIncludeKeys);
  console.log(keyQuerys);
  console.log(validActivitiesAttsAct_);
  if (whereKeys.length > 0) {
    whereObj = {}
    whereKeys.forEach(key => {
      whereObj[key] = querys[key]
    })
  }
  if (whereIncludeKeys.length > 0) {
    whereObjIncludes = {}
    whereIncludeKeys.map(key => {
      console.log(key.slice(4));
      return key.slice(4)
    }).forEach(key => {
      whereObjIncludes[key] = querys['act_' + key]
    })
  }
  return { page, whereObj, whereObjIncludes, orden }
}

