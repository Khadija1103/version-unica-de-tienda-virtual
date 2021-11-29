import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ProductoOServicio,
  Ventas,
} from '../models';
import {ProductoOServicioRepository} from '../repositories';

export class ProductoOServicioVentasController {
  constructor(
    @repository(ProductoOServicioRepository)
    public productoOServicioRepository: ProductoOServicioRepository,
  ) { }

  @get('/producto-o-servicios/{id}/ventas', {
    responses: {
      '200': {
        description: 'Ventas belonging to ProductoOServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ventas)},
          },
        },
      },
    },
  })
  async getVentas(
    @param.path.string('id') id: typeof ProductoOServicio.prototype.id,
  ): Promise<Ventas> {
    return this.productoOServicioRepository.tiene(id);
  }
}
