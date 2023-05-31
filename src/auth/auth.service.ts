import { Injectable, UnauthorizedException } from "@nestjs/common";

import { CryptoService } from "./crypto.service";
import { JwtService } from "@nestjs/jwt";
import { AccountService } from "../account/account.service";
import { CredentialsDto } from "./dto/credentials.dto";
import { AccountDto, AccountForCreateDto } from "../account/dto/account.dto";
import { SignInResponseDto } from "./dto/signInResponse.dto";
import { SignatureService } from "../signature/signature.service";

@Injectable()
export class AuthService {
	constructor(
		private cryptoService: CryptoService,
		private jwtService: JwtService,
		private accountService: AccountService,
		private signatureService: SignatureService
	) {}

	async signUp(data: CredentialsDto): Promise<void> {
		const userExists = await this.accountService.exists(data.login);
		if (userExists) {
			throw new UnauthorizedException("Bad user data");
		}

		const accountForCreate = await this.validateForCreation(data);
		const account = await this.accountService.create(accountForCreate);
		const keyPair = await this.signatureService.genKeyPair();
		await this.accountService.addKeyPairToWallet(account._id, keyPair);
	}

	async validateForCreation(
		data: CredentialsDto
	): Promise<AccountForCreateDto> {
		const account = {
			...data,
			balance: 0,
			wallet: [],
		};
		account.password = await this.cryptoService.encrypt(account.password);
		return account;
	}

	async signIn(credentials: CredentialsDto): Promise<SignInResponseDto> {
		const user = await this.accountService.findByLogin(credentials.login);
		await this.validateCredentials(credentials, user);
		const token = this.getToken(user);
		return {
			access_token: token,
		};
	}

	async validateCredentials(
		credentials: CredentialsDto,
		accountDto: AccountDto
	): Promise<void> {
		if (!accountDto) {
			throw new UnauthorizedException("Bad credentials");
		}

		const isPasswordMatch = await this.cryptoService.isMatch(
			credentials.password,
			accountDto.password
		);
		if (!isPasswordMatch) {
			throw new UnauthorizedException("Bad credentials");
		}
		return;
	}

	getToken(accountDto: AccountDto) {
		const payload = { sub: accountDto._id };
		return this.jwtService.sign(payload);
	}
}
