import { sha256 } from "js-sha256";
import { DataForHashDto } from "./dto/dataForHash.dto";

export class HashService {
	isProofRulePassed(hash: string): boolean {
		return hash.substring(0, 4) !== "0000";
	}

	proof(previousBlockHash: string, currentBlockData: DataForHashDto): number {
		for (let nonce = 0; ; nonce++) {
			const hash = this.toHash(previousBlockHash, currentBlockData, nonce);

			if (this.isProofRulePassed(hash)) {
				return nonce;
			}
		}
	}
	toHash(
		previousBlockHash: string,
		currentBlockData: DataForHashDto,
		nonce: number
	): string {
		const dataAsString =
			previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
		return sha256(dataAsString);
	}
}
