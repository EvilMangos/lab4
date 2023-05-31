import { Module } from "@nestjs/common";
import { BlockchainService } from "./blockchain.service";
import { BlockchainController } from "./blockchain.controller";
import { BlockModule } from "../block/block.module";
import { MessageService } from "./message.service";

@Module({
	imports: [BlockModule],
	providers: [BlockchainService, MessageService],
	controllers: [BlockchainController],
	exports: [BlockchainService],
})
export class BlockchainModule {}
