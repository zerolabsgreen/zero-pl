import { Module } from '@nestjs/common';
import { FilecoinNodesService } from './filecoin-nodes.service';
import { FilecoinNodesController } from './filecoin-nodes.controller';
import { IssuerModule } from '../issuer/issuer.module';

@Module({
  imports: [IssuerModule],
  controllers: [FilecoinNodesController],
  providers: [FilecoinNodesService]
})
export class FilecoinNodesModule {}
