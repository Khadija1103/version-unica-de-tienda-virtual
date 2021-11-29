import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {UsuarioAsesor, UsuarioAsesorRelations} from '../models';

export class UsuarioAsesorRepository extends DefaultCrudRepository<
  UsuarioAsesor,
  typeof UsuarioAsesor.prototype.id,
  UsuarioAsesorRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(UsuarioAsesor, dataSource);
  }
}
