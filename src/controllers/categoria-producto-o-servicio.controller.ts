import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Categoria,
  ProductoOServicio,
} from '../models';
import {CategoriaRepository} from '../repositories';

export class CategoriaProductoOServicioController {
  constructor(
    @repository(CategoriaRepository)
    public categoriaRepository: CategoriaRepository,
  ) { }

  @get('/categorias/{id}/producto-o-servicio', {
    responses: {
      '200': {
        description: 'ProductoOServicio belonging to Categoria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductoOServicio)},
          },
        },
      },
    },
  })
  async getProductoOServicio(
    @param.path.string('id') id: typeof Categoria.prototype.id,
  ): Promise<ProductoOServicio> {
    return this.categoriaRepository.tiene(id);
  }
}
