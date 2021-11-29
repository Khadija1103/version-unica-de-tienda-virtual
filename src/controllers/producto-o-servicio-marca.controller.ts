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
  Marca,
} from '../models';
import {ProductoOServicioRepository} from '../repositories';

export class ProductoOServicioMarcaController {
  constructor(
    @repository(ProductoOServicioRepository) protected productoOServicioRepository: ProductoOServicioRepository,
  ) { }

  @get('/producto-o-servicios/{id}/marcas', {
    responses: {
      '200': {
        description: 'Array of ProductoOServicio has many Marca',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Marca)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Marca>,
  ): Promise<Marca[]> {
    return this.productoOServicioRepository.marcas(id).find(filter);
  }

  @post('/producto-o-servicios/{id}/marcas', {
    responses: {
      '200': {
        description: 'ProductoOServicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Marca)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ProductoOServicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marca, {
            title: 'NewMarcaInProductoOServicio',
            exclude: ['id'],
            optional: ['idproductooservicio']
          }),
        },
      },
    }) marca: Omit<Marca, 'id'>,
  ): Promise<Marca> {
    return this.productoOServicioRepository.marcas(id).create(marca);
  }

  @patch('/producto-o-servicios/{id}/marcas', {
    responses: {
      '200': {
        description: 'ProductoOServicio.Marca PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Marca, {partial: true}),
        },
      },
    })
    marca: Partial<Marca>,
    @param.query.object('where', getWhereSchemaFor(Marca)) where?: Where<Marca>,
  ): Promise<Count> {
    return this.productoOServicioRepository.marcas(id).patch(marca, where);
  }

  @del('/producto-o-servicios/{id}/marcas', {
    responses: {
      '200': {
        description: 'ProductoOServicio.Marca DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Marca)) where?: Where<Marca>,
  ): Promise<Count> {
    return this.productoOServicioRepository.marcas(id).delete(where);
  }
}
