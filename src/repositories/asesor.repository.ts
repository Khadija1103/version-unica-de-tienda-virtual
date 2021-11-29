import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Asesor, AsesorRelations, Cliente, UsuarioAsesor, Ventas} from '../models';
import {ClienteRepository} from './cliente.repository';
import {UsuarioAsesorRepository} from './usuario-asesor.repository';
import {VentasRepository} from './ventas.repository';

export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.id,
  AsesorRelations
> {

  public readonly cliente: HasManyRepositoryFactory<Cliente, typeof Asesor.prototype.id>;

  public readonly usuarioAsesor: HasOneRepositoryFactory<UsuarioAsesor, typeof Asesor.prototype.id>;

  public readonly ventas: HasManyRepositoryFactory<Ventas, typeof Asesor.prototype.id>;

  clientes(id: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('UsuarioAsesorRepository') protected usuarioAsesorRepositoryGetter: Getter<UsuarioAsesorRepository>, @repository.getter('VentasRepository') protected ventasRepositoryGetter: Getter<VentasRepository>,
  ) {
    super(Asesor, dataSource);
    this.ventas = this.createHasManyRepositoryFactoryFor('ventas', ventasRepositoryGetter,);
    this.registerInclusionResolver('ventas', this.ventas.inclusionResolver);
    this.usuarioAsesor = this.createHasOneRepositoryFactoryFor('usuarioAsesor', usuarioAsesorRepositoryGetter);
    this.registerInclusionResolver('usuarioAsesor', this.usuarioAsesor.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.cliente.inclusionResolver);
  }
}
