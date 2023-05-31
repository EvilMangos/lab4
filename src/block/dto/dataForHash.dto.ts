import { Prop } from "@nestjs/mongoose";
import { IsInt, Min } from "class-validator";
import { TransactionDto } from "./transaction.dto";

export class DataForHashDto {
	@Prop({ required: true, unique: true })
	@IsInt()
	@Min(0)
	index: number;
	@Prop({ required: true })
	timestamp: Date;
	@Prop({ required: true })
	transactions: TransactionDto[];
}
