import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersController } from './sellers.controller';
import { IssuerModule } from '../issuer/issuer.module';

@Module({
  imports: [IssuerModule],
  controllers: [SellersController],
  providers: [SellersService]
})
export class SellersModule {}
