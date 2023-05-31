import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";
import { KeyPairDto } from "./dto/keyPair.dto";
import { KeyObject } from "crypto";
import { Buffer } from "buffer";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class SignatureService {
	genKeyPair(): KeyPairDto {
		// @ts-ignore
		const keyPair = crypto.generateKeyPairSync("rsa", {
			modulusLength: 2048,
		});
		return {
			id: uuidv4(),
			privateKey: keyPair.privateKey,
			publicKey: keyPair.publicKey,
		};
	}

	sign(message: string, privateKey: KeyObject): Buffer {
		const bufferMessage = Buffer.from(message);
		return crypto.sign("sha256", bufferMessage, privateKey);
	}

	verify(message: string, signature: Buffer, publicKey: KeyObject): boolean {
		const bufferMessage = Buffer.from(message);
		return crypto.verify("sha256", bufferMessage, publicKey, signature);
	}
}
