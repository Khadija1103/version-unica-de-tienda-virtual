import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  ProductoOServicio,
  Foto,
} from '../models';
import {ProductoOServicioRepository} from '../repositories';

export class ProductoOServicioFotoController {
  constructor(
    @repository(ProductoOServicioRepository) protected productoOServicioRepository: ProductoOServicioRepository,
  ) { }

  @get('/producto-o-servicios/{id}/fotos', {
    responses: {
      '200': {
        description: 'Array of ProductoOServicio has many Foto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Foto)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Foto>,
  ): Promise<Foto[]> {
    return this.productoOServicioRepository.fotos(id).find(filter);
  }

  @post('/producto-o-servicios/{id}/fotos', {
    responses: {
      '200': {
        description: 'ProductoOServicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Foto)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ProductoOServicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foto, {
            title: 'NewFotoInProductoOServicio',
            exclude: ['id'],
            optional: ['idproductooservicio']
          }),
        },
      },
    }) foto: Omit<Foto, 'id'>,
  ): Promise<Foto> {
    return this.productoOServicioRepository.fotos(id).create(foto);
  }

  @patch('/producto-o-servicios/{id}/fotos', {
    responses: {
      '200': {
        description: 'ProductoOServicio.Foto PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Foto, {partial: true}),
        },
      },
    })
    foto: Partial<Foto>,
    @param.query.object('where', getWhereSchemaFor(Foto)) where?: Where<Foto>,
  ): Promise<Count> {
    return this.productoOServicioRepository.fotos(id).patch(foto, where);
  }

  @del('/producto-o-servicios/{id}/fotos', {
    responses: {
      '200': {
        description: 'ProductoOServicio.Foto DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Foto)) where?: Where<Foto>,
  ): Promise<Count> {
    return this.productoOServicioRepository.fotos(id).delete(where);
  }
}
