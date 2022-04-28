import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, BaseEntity, ObjectID, ObjectIdColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { SERVICE } from '../../../common/constants/app-strings';

@Entity()
export class ServerSettings extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  @ApiProperty()
  uuid: string;

  @Column()
  @ApiProperty()
  appURL: string;

  @Column()
  @ApiProperty()
  authServerURL: string;

  @Column()
  @ApiProperty()
  clientId: string;

  @Column()
  clientSecret: string;

  @Column()
  @ApiProperty()
  profileURL: string;

  @Column()
  @ApiProperty()
  tokenURL: string;

  @Column()
  @ApiProperty()
  introspectionURL: string;

  @Column()
  @ApiProperty()
  authorizationURL: string;

  @Column()
  @ApiProperty()
  callbackURLs: string[];

  @Column()
  @ApiProperty()
  revocationURL: string;

  @Column()
  @ApiProperty()
  service: string = SERVICE;

  @Column()
  @ApiProperty()
  cloudStorageSettings: string;

  @Column()
  @ApiProperty()
  callbackProtocol: string;

  @Column()
  @ApiProperty()
  clientTokenUuid: string;

  constructor() {
    super();
    if (!this.uuid) this.uuid = uuidv4();
  }
}
