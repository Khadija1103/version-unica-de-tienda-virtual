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
  Ventas,
  ProductoOServicio,
} from '../models';
import {VentasRepository} from '../repositories';

export class VentasProductoOServicioController {
  constructor(
    @repository(VentasRepository) protected ventasRepository: VentasRepository,
  ) { }

  @get('/ventas/{id}/producto-o-servicios', {
    responses: {
      '200': {
        description: 'Array of Ventas has many ProductoOServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductoOServicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProductoOServicio>,
  ): Promise<ProductoOServicio[]> {
    return this.ventasRepository.productoOServicios(id).find(filter);
  }

  @post('/ventas/{id}/producto-o-servicios', {
    responses: {
      '200': {
        description: 'Ventas model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductoOServicio)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Ventas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoOServicio, {
            title: 'NewProductoOServicioInVentas',
            exclude: ['id'],
            optional: ['idventas']
          }),
        },
      },
    }) productoOServicio: Omit<ProductoOServicio, 'id'>,
  ): Promise<ProductoOServicio> {
    return this.ventasRepository.productoOServicios(id).create(productoOServicio);
  }

  @patch('/ventas/{id}/producto-o-servicios', {
    responses: {
      '200': {
        description: 'Ventas.ProductoOServicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
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
    return this.ventasRepository.productoOServicios(id).patch(productoOServicio, where);
  }

  @del('/ventas/{id}/producto-o-servicios', {
    responses: {
      '200': {
        description: 'Ventas.ProductoOServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProductoOServicio)) where?: Where<ProductoOServicio>,
  ): Promise<Count> {
    return this.ventasRepository.productoOServicios(id).delete(where);
  }
}
