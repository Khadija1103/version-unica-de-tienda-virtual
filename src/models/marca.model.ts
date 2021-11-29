import {Entity, model, property, hasMany} from '@loopback/repository';
import {ProductoOServicio} from './producto-o-servicio.model';

@model()
export class Marca extends Entity {
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

  @hasMany(() => ProductoOServicio, {keyTo: 'idmarca'})
  productoOServicios: ProductoOServicio[];

  @property({
    type: 'string',
  })
  idproductooservicio?: string;

  constructor(data?: Partial<Marca>) {
    super(data);
  }
}

export interface MarcaRelations {
  // describe navigational properties here
}

export type MarcaWithRelations = Marca & MarcaRelations;
