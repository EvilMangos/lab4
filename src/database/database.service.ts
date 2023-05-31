import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { ModelsDto } from "./dto/models.dto";
import { InjectModel } from "@nestjs/mongoose";
import { BlockDto } from "../block/dto/block.dto";
import { AccountDto } from "../account/dto/account.dto";

@Injectable()
export class DatabaseService {
	public models: ModelsDto = {};
	constructor(
		@InjectModel(BlockDto.name) blockModel: Model<BlockDto>,
		@InjectModel(AccountDto.name) accountModel: Model<AccountDto>
	) {
		this.models.block = blockModel;
		this.models.account = accountModel;
	}
}
