import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Ventas, VentasRelations, Asesor, Cliente, ProductoOServicio} from '../models';
import {AsesorRepository} from './asesor.repository';
import {ClienteRepository} from './cliente.repository';
import {ProductoOServicioRepository} from './producto-o-servicio.repository';

export class VentasRepository extends DefaultCrudRepository<
  Ventas,
  typeof Ventas.prototype.id,
  VentasRelations
> {

  public readonly idaseso: BelongsToAccessor<Asesor, typeof Ventas.prototype.id>;

  public readonly pertenece: BelongsToAccessor<Cliente, typeof Ventas.prototype.id>;

  public readonly productoOServicios: HasManyRepositoryFactory<ProductoOServicio, typeof Ventas.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ProductoOServicioRepository') protected productoOServicioRepositoryGetter: Getter<ProductoOServicioRepository>,
  ) {
    super(Ventas, dataSource);
    this.productoOServicios = this.createHasManyRepositoryFactoryFor('productoOServicios', productoOServicioRepositoryGetter,);
    this.registerInclusionResolver('productoOServicios', this.productoOServicios.inclusionResolver);
    this.pertenece = this.createBelongsToAccessorFor('pertenece', clienteRepositoryGetter,);
    this.registerInclusionResolver('pertenece', this.pertenece.inclusionResolver);
    this.idaseso = this.createBelongsToAccessorFor('idaseso', asesorRepositoryGetter,);
    this.registerInclusionResolver('idaseso', this.idaseso.inclusionResolver);
  }
}
