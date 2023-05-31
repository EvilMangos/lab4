import { Prop } from "@nestjs/mongoose";
import { IsNotEmpty, Min } from "class-validator";

export class TransactionDto {
	@Prop({ required: true })
	@Min(0)
	amount: number;
	@Prop({ required: true })
	@IsNotEmpty()
	sender: string;
	@Prop({ required: true })
	@IsNotEmpty()
	recipient: string;
}
