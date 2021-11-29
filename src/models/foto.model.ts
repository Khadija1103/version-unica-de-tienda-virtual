import {Entity, model, property, belongsTo} from '@loopback/repository';
import {ProductoOServicio} from './producto-o-servicio.model';

@model()
export class Foto extends Entity {
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
  })
  productoOServicioId?: string;

  @belongsTo(() => ProductoOServicio, {name: 'tiene'})
  idproductooservicio: string;

  constructor(data?: Partial<Foto>) {
    super(data);
  }
}

export interface FotoRelations {
  // describe navigational properties here
}

export type FotoWithRelations = Foto & FotoRelations;
