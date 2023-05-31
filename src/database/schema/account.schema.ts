import { SchemaFactory } from "@nestjs/mongoose";
import { AccountDto } from "../../account/dto/account.dto";

export const AccountSchema = SchemaFactory.createForClass(AccountDto);
