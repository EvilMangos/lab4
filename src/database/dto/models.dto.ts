import { Model } from "mongoose";
import { BlockDto } from "../../block/dto/block.dto";
import { AccountDto } from "../../account/dto/account.dto";

export class ModelsDto {
	block?: Model<BlockDto>;
	account?: Model<AccountDto>;
}
