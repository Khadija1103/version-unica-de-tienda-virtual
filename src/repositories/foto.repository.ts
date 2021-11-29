import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Foto, FotoRelations, ProductoOServicio} from '../models';
import {ProductoOServicioRepository} from './producto-o-servicio.repository';

export class FotoRepository extends DefaultCrudRepository<
  Foto,
  typeof Foto.prototype.id,
  FotoRelations
> {

  public readonly tiene: BelongsToAccessor<ProductoOServicio, typeof Foto.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductoOServicioRepository') protected productoOServicioRepositoryGetter: Getter<ProductoOServicioRepository>,
  ) {
    super(Foto, dataSource);
    this.tiene = this.createBelongsToAccessorFor('tiene', productoOServicioRepositoryGetter,);
    this.registerInclusionResolver('tiene', this.tiene.inclusionResolver);
  }
}
