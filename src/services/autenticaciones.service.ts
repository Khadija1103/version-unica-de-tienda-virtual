import {injectable, /* inject, */ BindingScope} from '@loopback/core';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");


@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionesService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */


  generarClave(){
     const clave = generador(10, false);
     return clave;
  }


  cifrarClave(clave:string){
    const claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  


}
