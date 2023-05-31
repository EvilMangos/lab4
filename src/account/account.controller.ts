import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { AccountService } from "./account.service";
import { KeyPairDto } from "../signature/dto/keyPair.dto";
import { JwtAuthUserDto } from "../auth/dto/jwtAuthUser.dto";
import { AuthUser } from "../auth/decorator/authUser.decorator";
import { Buffer } from "buffer";
import { TransactionDto } from "../block/dto/transaction.dto";

@Controller("account")
export class AccountController {
	constructor(private accountService: AccountService) {}
	@Get("wallet/:id")
	async getKeyPaid(
		@Param() params: { id: string },
		@AuthUser() user: JwtAuthUserDto
	): Promise<KeyPairDto> {
		return this.accountService.getKeyPairById(user.id, params.id);
	}

	@Post("wallet")
	async createKeyPair(@AuthUser() user: JwtAuthUserDto): Promise<string> {
		return this.accountService.genKeyPair(user.id);
	}

	@Put("balance")
	async updateBalance(
		@AuthUser() user: JwtAuthUserDto,
		@Body() body: { value: number }
	): Promise<void> {
		await this.accountService.updateBalance(user.id, body.value);
	}

	@Get("balance")
	async getBalance(@AuthUser() user: JwtAuthUserDto): Promise<number> {
		return this.accountService.getBalance(user.id);
	}

	@Post("sign")
	async signData(
		@AuthUser() user: JwtAuthUserDto,
		@Body() body: { data: any; keyPairId: string }
	): Promise<Buffer> {
		return this.accountService.signData(
			JSON.stringify(body.data),
			body.keyPairId,
			user.id
		);
	}

	@Post("operation")
	async createOperation(
		@AuthUser() user: JwtAuthUserDto,
		@Body()
		body: { operation: TransactionDto; keyPairId: string; signedData: Buffer }
	): Promise<TransactionDto> {
		return this.accountService.createOperation(
			user.id,
			body.operation,
			body.signedData,
			body.keyPairId
		);
	}
}
