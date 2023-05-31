import { TId } from "../../database/type/id.type";
import { Prop, Schema } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty, Min } from "class-validator";
import { Schema as MongooseSchema } from "mongoose";

export class AccountForCreateDto {
	@Prop([MongooseSchema.Types.String])
	wallet: string[];
	@Prop({ required: true })
	@Min(0)
	balance: number;
	@Prop({ required: true, unique: true })
	@IsNotEmpty()
	@IsEmail()
	login: string;
	@Prop({ required: true })
	@IsNotEmpty()
	password: string;
}

@Schema({ collection: "accounts" })
export class AccountDto extends AccountForCreateDto {
	_id: TId;
}
