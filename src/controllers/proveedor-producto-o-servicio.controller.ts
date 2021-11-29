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
  Proveedor,
  ProductoOServicio,
} from '../models';
import {ProveedorRepository} from '../repositories';

export class ProveedorProductoOServicioController {
  constructor(
    @repository(ProveedorRepository) protected proveedorRepository: ProveedorRepository,
  ) { }

  @get('/proveedors/{id}/producto-o-servicios', {
    responses: {
      '200': {
        description: 'Array of Proveedor has many ProductoOServicio',
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
    return this.proveedorRepository.productoOServicios(id).find(filter);
  }

  @post('/proveedors/{id}/producto-o-servicios', {
    responses: {
      '200': {
        description: 'Proveedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProductoOServicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Proveedor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoOServicio, {
            title: 'NewProductoOServicioInProveedor',
            exclude: ['id'],
            optional: ['idproveedor']
          }),
        },
      },
    }) productoOServicio: Omit<ProductoOServicio, 'id'>,
  ): Promise<ProductoOServicio> {
    return this.proveedorRepository.productoOServicios(id).create(productoOServicio);
  }

  @patch('/proveedors/{id}/producto-o-servicios', {
    responses: {
      '200': {
        description: 'Proveedor.ProductoOServicio PATCH success count',
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
    return this.proveedorRepository.productoOServicios(id).patch(productoOServicio, where);
  }

  @del('/proveedors/{id}/producto-o-servicios', {
    responses: {
      '200': {
        description: 'Proveedor.ProductoOServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(ProductoOServicio)) where?: Where<ProductoOServicio>,
  ): Promise<Count> {
    return this.proveedorRepository.productoOServicios(id).delete(where);
  }
}
