import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ProductoOServicio} from '../models';
import {ProductoOServicioRepository} from '../repositories';

export class ProductooservicioController {
  constructor(
    @repository(ProductoOServicioRepository)
    public productoOServicioRepository : ProductoOServicioRepository,
  ) {}

  @post('/producto-o-servicios')
  @response(200, {
    description: 'ProductoOServicio model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProductoOServicio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoOServicio, {
            title: 'NewProductoOServicio',
            exclude: ['id'],
          }),
        },
      },
    })
    productoOServicio: Omit<ProductoOServicio, 'id'>,
  ): Promise<ProductoOServicio> {
    return this.productoOServicioRepository.create(productoOServicio);
  }

  @get('/producto-o-servicios/count')
  @response(200, {
    description: 'ProductoOServicio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProductoOServicio) where?: Where<ProductoOServicio>,
  ): Promise<Count> {
    return this.productoOServicioRepository.count(where);
  }

  @get('/producto-o-servicios')
  @response(200, {
    description: 'Array of ProductoOServicio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductoOServicio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProductoOServicio) filter?: Filter<ProductoOServicio>,
  ): Promise<ProductoOServicio[]> {
    return this.productoOServicioRepository.find(filter);
  }

  @patch('/producto-o-servicios')
  @response(200, {
    description: 'ProductoOServicio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoOServicio, {partial: true}),
        },
      },
    })
    productoOServicio: ProductoOServicio,
    @param.where(ProductoOServicio) where?: Where<ProductoOServicio>,
  ): Promise<Count> {
    return this.productoOServicioRepository.updateAll(productoOServicio, where);
  }

  @get('/producto-o-servicios/{id}')
  @response(200, {
    description: 'ProductoOServicio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProductoOServicio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id:string,
    @param.filter(ProductoOServicio, {exclude: 'where'}) filter?: FilterExcludingWhere<ProductoOServicio>
  ): Promise<ProductoOServicio> {
    return this.productoOServicioRepository.findById(id, filter);
  }

  @patch('/producto-o-servicios/{id}')
  @response(204, {
    description: 'ProductoOServicio PATCH success',
  })
  async updateById(
    @param.path.number('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductoOServicio, {partial: true}),
        },
      },
    })
    productoOServicio: ProductoOServicio,
  ): Promise<void> {
    await this.productoOServicioRepository.updateById(id, productoOServicio);
  }

  @put('/producto-o-servicios/{id}')
  @response(204, {
    description: 'ProductoOServicio PUT success',
  })
  async replaceById(
    @param.path.number('id') id: string,
    @requestBody() productoOServicio: ProductoOServicio,
  ): Promise<void> {
    await this.productoOServicioRepository.replaceById(id, productoOServicio);
  }

  @del('/producto-o-servicios/{id}')
  @response(204, {
    description: 'ProductoOServicio DELETE success',
  })
  async deleteById(@param.path.number('id') id: string): Promise<void> {
    await this.productoOServicioRepository.deleteById(id);
  }
}
