import {Entity, model, property, hasMany} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {Asesor} from './asesor.model';
import {Ventas} from './ventas.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: false,
  })
  clave: string;

  @property({
    type: 'string',
  })
  idasesor?: string;

  @hasMany(() => Mascota, {keyTo: 'idcliente'})
  mascotas: Mascota[];

  @hasMany(() => Asesor, {keyTo: 'idcliente'})
  asesors: Asesor[];

  @hasMany(() => Ventas, {keyTo: 'idcliente'})
  ventas: Ventas[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
