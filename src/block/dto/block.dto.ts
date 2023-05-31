import { TransactionDto } from "./transaction.dto";
import { Prop, Schema } from "@nestjs/mongoose";
import { IsInt, IsNotEmpty, Min } from "class-validator";
import { TId } from "../../database/type/id.type";

export class BlockForCreateDto {
	@Prop({ required: true, unique: true })
	@IsInt()
	@Min(0)
	index: number;
	@Prop({ required: true })
	timestamp: Date;
	@Prop([TransactionDto])
	transactions: TransactionDto[];
	@Prop({ required: true })
	@IsInt()
	@Min(0)
	nonce: number;
	@Prop({ required: true })
	@IsNotEmpty()
	hash: string;
	@Prop({ required: true })
	@IsNotEmpty()
	previousBlockHash: string;
}

@Schema({ collection: "blocks" })
export class BlockDto extends BlockForCreateDto {
	_id: TId;
}
