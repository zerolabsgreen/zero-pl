import { Module } from '@nestjs/common';
import { FilecoinNodesService } from './filecoin-nodes.service';
import { FilecoinNodesController } from './filecoin-nodes.controller';
import { IssuerModule } from '../issuer/issuer.module';
import { BatchModule } from '../batches/batch.module';

@Module({
  imports: [IssuerModule, BatchModule],
  controllers: [FilecoinNodesController],
  providers: [FilecoinNodesService],
  exports: [FilecoinNodesService]
})
export class FilecoinNodesModule {}
