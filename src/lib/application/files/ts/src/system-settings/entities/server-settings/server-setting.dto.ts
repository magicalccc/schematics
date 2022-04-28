import {
  IsUrl,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ServerSettingsDto {
  uuid?: string;

  @IsUrl()
  @ApiProperty({
    description: 'The URL of the server.',
    type: 'string',
    required: true,
  })
  appURL: string;

  @IsUrl()
  @ApiProperty()
  authServerURL: string;

  @IsNotEmpty()
  @ApiProperty()
  clientId: string;

  @IsNotEmpty()
  @ApiProperty()
  clientSecret: string;

  @IsOptional()
  @ApiProperty()
  @IsUrl({ allow_underscores: true }, { each: true })
  callbackURLs: string[];

  @IsOptional()
  @IsString()
  @ApiProperty()
  callbackProtocol: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty()
  clientTokenUuid: string;
}
