import { ApiProperty } from '@nestjs/swagger';

export class RevokeTokenDto {
  @ApiProperty({ required: true })
  token: string;
}
