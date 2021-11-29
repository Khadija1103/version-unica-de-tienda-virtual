import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Foto,
  ProductoOServicio,
} from '../models';
import {FotoRepository} from '../repositories';

export class FotoProductoOServicioController {
  constructor(
    @repository(FotoRepository)
    public fotoRepository: FotoRepository,
  ) { }

  @get('/fotos/{id}/producto-o-servicio', {
    responses: {
      '200': {
        description: 'ProductoOServicio belonging to Foto',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProductoOServicio)},
          },
        },
      },
    },
  })
  async getProductoOServicio(
    @param.path.string('id') id: typeof Foto.prototype.id,
  ): Promise<ProductoOServicio> {
    return this.fotoRepository.tiene(id);
  }
}
