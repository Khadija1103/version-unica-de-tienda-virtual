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
  Proveedor,
} from '../models';
import {ProductoOServicioRepository} from '../repositories';

export class ProductoOServicioProveedorController {
  constructor(
    @repository(ProductoOServicioRepository) protected productoOServicioRepository: ProductoOServicioRepository,
  ) { }

  @get('/producto-o-servicios/{id}/proveedors', {
    responses: {
      '200': {
        description: 'Array of ProductoOServicio has many Proveedor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proveedor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Proveedor>,
  ): Promise<Proveedor[]> {
    return this.productoOServicioRepository.proveedors(id).find(filter);
  }

  @post('/producto-o-servicios/{id}/proveedors', {
    responses: {
      '200': {
        description: 'ProductoOServicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proveedor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ProductoOServicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {
            title: 'NewProveedorInProductoOServicio',
            exclude: ['id'],
            optional: ['idproductooservicio']
          }),
        },
      },
    }) proveedor: Omit<Proveedor, 'id'>,
  ): Promise<Proveedor> {
    return this.productoOServicioRepository.proveedors(id).create(proveedor);
  }

  @patch('/producto-o-servicios/{id}/proveedors', {
    responses: {
      '200': {
        description: 'ProductoOServicio.Proveedor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proveedor, {partial: true}),
        },
      },
    })
    proveedor: Partial<Proveedor>,
    @param.query.object('where', getWhereSchemaFor(Proveedor)) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.productoOServicioRepository.proveedors(id).patch(proveedor, where);
  }

  @del('/producto-o-servicios/{id}/proveedors', {
    responses: {
      '200': {
        description: 'ProductoOServicio.Proveedor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Proveedor)) where?: Where<Proveedor>,
  ): Promise<Count> {
    return this.productoOServicioRepository.proveedors(id).delete(where);
  }
}
