import fs from "fs";
import { KeyPairDto } from "../signature/dto/keyPair.dto";
import { ForbiddenException } from "@nestjs/common";

const PATH = "src/database/data";
export class FileDbService {
	private store: any = {};
	async loadById(id: string): Promise<KeyPairDto> {
		if (!this.store[id]) {
			throw new ForbiddenException();
		}
		return this.store[id];
	}

	async load(): Promise<any> {
		return this.store;
	}

	async save(id: string, data: any): Promise<void> {
		this.store[id] = data;
	}
}
