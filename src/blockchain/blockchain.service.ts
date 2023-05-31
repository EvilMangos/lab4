import { Injectable } from "@nestjs/common";
import { TransactionDto } from "../block/dto/transaction.dto";
import { BlockService } from "../block/block.service";

@Injectable()
export class BlockchainService {
	private transactions: TransactionDto[] = [];
	constructor(private blockService: BlockService) {}

	async createGenesisBlock(): Promise<void> {
		await this.blockService.createGenesisBlock();
	}
	async createTransaction(data: TransactionDto): Promise<TransactionDto> {
		this.transactions.push(data);
		return data;
	}

	async createBlock(): Promise<number> {
		const block = await this.blockService.create(this.transactions);
		this.transactions = [];
		await this.createTransaction({
			amount: 1,
			sender: "00",
			recipient: "1234",
		});

		return block;
	}
}
