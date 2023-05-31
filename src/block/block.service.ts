import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { BlockDto, BlockForCreateDto } from "./dto/block.dto";
import { TransactionDto } from "./dto/transaction.dto";
import { HashService } from "./hash.service";

@Injectable()
export class BlockService {
	private index: number;
	private lastBlock: BlockDto;
	constructor(private db: DatabaseService, private hashService: HashService) {}

	async createGenesisBlock(): Promise<void> {
		const count = await this.getLastIndex();
		if (!count) {
			const dataForCreate = {
				index: 0,
				hash: "123",
				previousBlockHash: "0000",
				timestamp: new Date(),
				transactions: [],
				nonce: 100,
			};
			const genesisBlock = await this.db.models.block.create(dataForCreate);
			this.index = genesisBlock.index;
			this.lastBlock = genesisBlock;
		}
	}

	async getLastBlock(): Promise<BlockDto> {
		if (this.lastBlock) {
			return this.lastBlock;
		} else {
			const lastBlock = await this.db.models.block.findOne(
				{},
				{},
				{ sort: { index: -1 } }
			);
			this.lastBlock = lastBlock;
			return lastBlock;
		}
	}

	async getLastIndex(): Promise<number> {
		if (this.index) {
			return this.index;
		} else {
			const index = await this.db.models.block.count();
			this.index = index;
			return index;
		}
	}

	async create(transactions: TransactionDto[]): Promise<number> {
		const blockForCreate = await this.validateBlockForCreate(transactions);
		const block = await this.db.models.block.create(blockForCreate);
		this.index = block.index;
		this.lastBlock = block;
		return block.index;
	}

	async validateBlockForCreate(
		transactions: TransactionDto[]
	): Promise<BlockForCreateDto> {
		const dataForHash = {
			index: await this.getLastIndex(),
			timestamp: new Date(),
			transactions,
		};

		const lastBlock = await this.getLastBlock();
		const nonce = this.hashService.proof(lastBlock.hash, dataForHash);
		const hash = this.hashService.toHash(lastBlock.hash, dataForHash, nonce);

		return {
			...dataForHash,
			previousBlockHash: lastBlock.hash,
			nonce,
			hash,
		};
	}
}
