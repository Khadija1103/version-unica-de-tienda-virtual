import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Marca, MarcaRelations, ProductoOServicio} from '../models';
import {ProductoOServicioRepository} from './producto-o-servicio.repository';

export class MarcaRepository extends DefaultCrudRepository<
  Marca,
  typeof Marca.prototype.id,
  MarcaRelations
> {

  public readonly productoOServicios: HasManyRepositoryFactory<ProductoOServicio, typeof Marca.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductoOServicioRepository') protected productoOServicioRepositoryGetter: Getter<ProductoOServicioRepository>,
  ) {
    super(Marca, dataSource);
    this.productoOServicios = this.createHasManyRepositoryFactoryFor('productoOServicios', productoOServicioRepositoryGetter,);
    this.registerInclusionResolver('productoOServicios', this.productoOServicios.inclusionResolver);
  }
}
