import { ApiProperty } from '@nestjs/swagger';

export class RootApiResponse {
  @ApiProperty({
    description: 'Service Name',
    type: 'string',
  })
  service: string;
}
