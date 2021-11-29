import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ProductoOServicio, ProductoOServicioRelations, Proveedor, Ventas, Foto, Marca} from '../models';
import {ProveedorRepository} from './proveedor.repository';
import {VentasRepository} from './ventas.repository';
import {FotoRepository} from './foto.repository';
import {MarcaRepository} from './marca.repository';

export class ProductoOServicioRepository extends DefaultCrudRepository<
  ProductoOServicio,
  typeof ProductoOServicio.prototype.id,
  ProductoOServicioRelations
> {

  public readonly proveedors: HasManyRepositoryFactory<Proveedor, typeof ProductoOServicio.prototype.id>;

  public readonly tiene: BelongsToAccessor<Ventas, typeof ProductoOServicio.prototype.id>;

  public readonly fotos: HasManyRepositoryFactory<Foto, typeof ProductoOServicio.prototype.id>;

  public readonly marcas: HasManyRepositoryFactory<Marca, typeof ProductoOServicio.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('VentasRepository') protected ventasRepositoryGetter: Getter<VentasRepository>, @repository.getter('FotoRepository') protected fotoRepositoryGetter: Getter<FotoRepository>, @repository.getter('MarcaRepository') protected marcaRepositoryGetter: Getter<MarcaRepository>,
  ) {
    super(ProductoOServicio, dataSource);
    this.marcas = this.createHasManyRepositoryFactoryFor('marcas', marcaRepositoryGetter,);
    this.registerInclusionResolver('marcas', this.marcas.inclusionResolver);
    this.fotos = this.createHasManyRepositoryFactoryFor('fotos', fotoRepositoryGetter,);
    this.registerInclusionResolver('fotos', this.fotos.inclusionResolver);
    this.tiene = this.createBelongsToAccessorFor('tiene', ventasRepositoryGetter,);
    this.registerInclusionResolver('tiene', this.tiene.inclusionResolver);
    this.proveedors = this.createHasManyRepositoryFactoryFor('proveedors', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedors', this.proveedors.inclusionResolver);
  }
}
