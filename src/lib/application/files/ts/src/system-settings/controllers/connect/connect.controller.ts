import { Controller, Post, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiBasicAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommonOpenApi } from '../../../common/constants/api-tags';
import { TokenCacheService } from '../../../auth/entities/token-cache/token-cache.service';
import { AuthServerVerificationGuard } from '../../../auth/guards/authserver-verification.guard';

@Controller('connect')
@ApiTags(CommonOpenApi.Connect)
export class ConnectController {
  constructor(private readonly tokenCacheService: TokenCacheService) {}

  @Post('v1/token_delete')
  @ApiBasicAuth()
  @ApiResponse({ status: HttpStatus.CREATED })
  @UseGuards(AuthServerVerificationGuard)
  async tokenDelete(@Body('accessToken') accessToken) {
    await this.tokenCacheService.deleteMany({ accessToken });
  }

  @Post('v1/user_delete')
  @ApiBasicAuth()
  @ApiResponse({ status: HttpStatus.CREATED })
  @UseGuards(AuthServerVerificationGuard)
  userDelete(@Body('user') user) {
    // TODO: Logic to delete user or user related data if saved
  }
}
