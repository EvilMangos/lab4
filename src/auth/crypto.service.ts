import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";

@Injectable()
export class CryptoService {
	async encrypt(password: string): Promise<string> {
		const salt = await bcrypt.genSalt();
		return bcrypt.hash(password, salt);
	}

	isMatch(password: string, hash: string): Promise<boolean> {
		return bcrypt.compare(password, hash);
	}
}
