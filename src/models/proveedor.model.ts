import {Entity, model, property, hasMany} from '@loopback/repository';
import {ProductoOServicio} from './producto-o-servicio.model';

@model()
export class Proveedor extends Entity {
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
  razonsocial: string;

  @property({
    type: 'string',
    required: true,
  })
  dirrecion: string;

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

  @hasMany(() => ProductoOServicio, {keyTo: 'idproveedor'})
  productoOServicios: ProductoOServicio[];

  @property({
    type: 'string',
  })
  idproductooservicio?: string;

  constructor(data?: Partial<Proveedor>) {
    super(data);
  }
}

export interface ProveedorRelations {
  // describe navigational properties here
}

export type ProveedorWithRelations = Proveedor & ProveedorRelations;
