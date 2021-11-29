import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Proveedor} from './proveedor.model';
import {Ventas} from './ventas.model';
import {Foto} from './foto.model';
import {Marca} from './marca.model';

@model()
export class ProductoOServicio extends Entity {
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
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  descuento: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
  })
  idproveedor?: string;

  @hasMany(() => Proveedor, {keyTo: 'idproductooservicio'})
  proveedors: Proveedor[];

  @belongsTo(() => Ventas, {name: 'tiene'})
  idventas: number;

  @hasMany(() => Foto, {keyTo: 'idproductooservicio'})
  fotos: Foto[];

  @property({
    type: 'string',
  })
  idmarca?: string;

  @hasMany(() => Marca, {keyTo: 'idproductooservicio'})
  marcas: Marca[];

  constructor(data?: Partial<ProductoOServicio>) {
    super(data);
  }
}

export interface ProductoOServicioRelations {
  // describe navigational properties here
}

export type ProductoOServicioWithRelations = ProductoOServicio & ProductoOServicioRelations;
