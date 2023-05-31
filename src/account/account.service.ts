import { ForbiddenException, Injectable } from "@nestjs/common";
import { SignatureService } from "../signature/signature.service";
import { DatabaseService } from "../database/database.service";
import { AccountDto, AccountForCreateDto } from "./dto/account.dto";
import { KeyPairDto } from "../signature/dto/keyPair.dto";
import { TId } from "../database/type/id.type";
import { Buffer } from "buffer";
import { FileDbService } from "../database/fileDb.service";
import { TransactionDto } from "../block/dto/transaction.dto";
import { BlockchainService } from "../blockchain/blockchain.service";

@Injectable()
export class AccountService {
	constructor(
		private db: DatabaseService,
		private fileDb: FileDbService,
		private signatureService: SignatureService,
		private blockchainService: BlockchainService
	) {}

	async create(data: AccountForCreateDto): Promise<AccountDto> {
		return this.db.models.account.create(data);
	}

	async exists(login): Promise<boolean> {
		const account = await this.db.models.account.exists({ login });
		return !!account;
	}

	async findByLogin(login: string): Promise<AccountDto> {
		return this.db.models.account.findOne({ login });
	}

	async addKeyPairToWallet(userId: TId, keyPair: KeyPairDto): Promise<void> {
		await this.db.models.account.updateOne(
			{ _id: userId },
			{ $push: { wallet: keyPair.id } }
		);
		await this.fileDb.save(keyPair.id, keyPair);
	}

	async updateBalance(userId: TId, balance: number): Promise<void> {
		await this.db.models.account.updateOne({ _id: userId }, { balance });
	}

	async getBalance(userId: TId): Promise<number> {
		const user = await this.db.models.account.findById(userId);
		return user.balance;
	}

	async genKeyPair(userId: TId): Promise<string> {
		const keyPair = this.signatureService.genKeyPair();
		await this.addKeyPairToWallet(userId, keyPair);
		return keyPair.id;
	}

	async getKeyPairById(userId: TId, id: string): Promise<KeyPairDto> {
		const account = await this.db.models.account.findById(userId);
		if (!account.wallet.includes(id)) {
			throw new ForbiddenException();
		}
		return this.fileDb.loadById(id);
	}

	async signData(
		message: string,
		keyPairId: string,
		userId: TId
	): Promise<Buffer> {
		const keyPair = await this.getKeyPairById(userId, keyPairId);
		return this.signatureService.sign(message, keyPair.privateKey);
	}

	async createOperation(
		userId: TId,
		operation: TransactionDto,
		signedData: Buffer,
		keyPairId: string
	): Promise<TransactionDto> {
		const keyPair = await this.getKeyPairById(userId, keyPairId);
		const isRight = this.signatureService.verify(
			JSON.stringify(operation),
			Buffer.from(signedData),
			keyPair.publicKey
		);
		if (!isRight) {
			throw new ForbiddenException();
		}
		return this.blockchainService.createTransaction(operation);
	}
}
