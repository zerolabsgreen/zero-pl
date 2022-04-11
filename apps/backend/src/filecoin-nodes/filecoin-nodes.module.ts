import { Module } from '@nestjs/common';
import { FilecoinNodesService } from './filecoin-nodes.service';
import { FilecoinNodesController } from './filecoin-nodes.controller';
import { IssuerModule } from '../issuer/issuer.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [IssuerModule, FilesModule],
  controllers: [FilecoinNodesController],
  providers: [FilecoinNodesService],
  exports: [FilecoinNodesService]
})
export class FilecoinNodesModule {}
