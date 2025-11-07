import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RefreshTokenEntity } from '../entities/token.entity';
import { IJwtFindParams, IJwtSavedParams } from '../../models';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenRepository {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private tokenModel: Repository<RefreshTokenEntity>,
    private jwtService: JwtService
  ) {}

  async delete(userId: string, deviceId: string) {
    return this.tokenModel.delete({ userId, deviceId });
  }

  async createToken(
    savedJwtParams: IJwtSavedParams
  ): Promise<RefreshTokenEntity> {
    const newToken = this.tokenModel.create(savedJwtParams);
    return this.tokenModel.save(newToken);
  }

  async findToken(findParams: IJwtFindParams) {
    const tokenEntity = await this.tokenModel.findOneBy({
      deviceId: findParams.deviceId,
      userId: findParams.userId,
    });
    return tokenEntity;
  }
}
