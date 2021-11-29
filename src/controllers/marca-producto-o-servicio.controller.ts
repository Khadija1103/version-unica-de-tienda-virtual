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
  Marca,
  ProductoOServicio,
} from '../models';
import {MarcaRepository} from '../repositories';

export class MarcaProductoOServicioController {
  constructor(
    @repository(MarcaRepository) protected marcaRepository: MarcaRepository,
  ) { }

  @get('/marcas/{id}/producto-o-servicios', {
    responses: {
      '200': {
        description: 'Array of Marca has many ProductoOServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductoOServicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<ProductoOServicio>,
  ): Promise<ProductoOServicio[]> {
    return this.marcaRepository.productoOServicios(id).find(filter);
  }

  @post('/marcas/{id}/producto-o-servicios', {
    responses: {
      '200': {
        description: 'Marca model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductoOServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Marca.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoOServicio, {
            title: 'NewProductoOServicioInMarca',
            exclude: ['id'],
            optional: ['idmarca']
          }),
        },
      },
    }) productoOServicio: Omit<ProductoOServicio, 'id'>,
  ): Promise<ProductoOServicio> {
    return this.marcaRepository.productoOServicios(id).create(productoOServicio);
  }

  @patch('/marcas/{id}/producto-o-servicios', {
    responses: {
      '200': {
        description: 'Marca.ProductoOServicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoOServicio, {partial: true}),
        },
      },
    })
    productoOServicio: Partial<ProductoOServicio>,
    @param.query.object('where', getWhereSchemaFor(ProductoOServicio)) where?: Where<ProductoOServicio>,
  ): Promise<Count> {
    return this.marcaRepository.productoOServicios(id).patch(productoOServicio, where);
  }

  @del('/marcas/{id}/producto-o-servicios', {
    responses: {
      '200': {
        description: 'Marca.ProductoOServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProductoOServicio)) where?: Where<ProductoOServicio>,
  ): Promise<Count> {
    return this.marcaRepository.productoOServicios(id).delete(where);
  }
}
