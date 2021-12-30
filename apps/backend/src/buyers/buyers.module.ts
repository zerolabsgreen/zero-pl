import { Module } from '@nestjs/common';
import { BuyersService } from './buyers.service';
import { BuyersController } from './buyers.controller';
import { IssuerModule } from '../issuer/issuer.module';

@Module({
  imports: [IssuerModule],
  controllers: [BuyersController],
  providers: [BuyersService],
  exports: [BuyersService]
})
export class BuyersModule {}
