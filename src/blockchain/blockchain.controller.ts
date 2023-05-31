import { Controller, Get, Post } from "@nestjs/common";
import { ResponseMessageDto } from "./dto/createTransaction.dto";
import { BlockchainService } from "./blockchain.service";
import { MessageService } from "./message.service";

@Controller("blockchain")
export class BlockchainController {
	constructor(
		private blockchainService: BlockchainService,
		private messageService: MessageService
	) {}
	@Post("init")
	async initBlockchain(): Promise<ResponseMessageDto> {
		await this.blockchainService.createGenesisBlock();
		return this.messageService.formMessage(`Blockchain initiated`);
	}

	@Get("mine")
	async createBlock(): Promise<ResponseMessageDto> {
		const index = await this.blockchainService.createBlock();
		return this.messageService.formMessage(
			`Block with index: ${index} created`
		);
	}
}
