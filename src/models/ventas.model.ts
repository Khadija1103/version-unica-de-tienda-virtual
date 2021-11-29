import {Entity, model, property, belongsTo, hasOne, hasMany} from '@loopback/repository';
import {Asesor} from './asesor.model';
import {Factura} from './factura.model';
import {Cliente} from './cliente.model';
import {ProductoOServicio} from './producto-o-servicio.model';

@model()
export class Ventas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  precioventa: number;

  @property({
    type: 'string',
    required: true,
  })
  idproducto: string;
  @property({
    type: 'string',
    required: true,
  })
  idproductooservicio: string;

  @property({
    type: 'string',
  })
  idfactura?: string;

  @belongsTo(() => Asesor, {name: 'idaseso'})
  idasesor: string;

  @hasOne(() => Factura, {keyTo: 'idventas'})
  factura: Factura;

  @belongsTo(() => Cliente, {name: 'pertenece'})
  idcliente: string;

  @hasMany(() => ProductoOServicio, {keyTo: 'idventas'})
  productoOServicios: ProductoOServicio[];

  constructor(data?: Partial<Ventas>) {
    super(data);
  }
}

export interface VentasRelations {
  // describe navigational properties here
}

export type VentasWithRelations = Ventas & VentasRelations;
