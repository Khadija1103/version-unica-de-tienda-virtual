import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Categoria, CategoriaRelations, ProductoOServicio} from '../models';
import {ProductoOServicioRepository} from './producto-o-servicio.repository';

export class CategoriaRepository extends DefaultCrudRepository<
  Categoria,
  typeof Categoria.prototype.id,
  CategoriaRelations
> {

  public readonly tiene: BelongsToAccessor<ProductoOServicio, typeof Categoria.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductoOServicioRepository') protected productoOServicioRepositoryGetter: Getter<ProductoOServicioRepository>,
  ) {
    super(Categoria, dataSource);
    this.tiene = this.createBelongsToAccessorFor('tiene', productoOServicioRepositoryGetter,);
    this.registerInclusionResolver('tiene', this.tiene.inclusionResolver);
  }
}
