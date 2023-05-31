import { KeyObject } from "crypto";
import { Prop } from "@nestjs/mongoose";

export class KeyPairDto {
	@Prop({ required: true })
	id: string;
	@Prop({ required: true })
	privateKey: KeyObject;
	@Prop({ required: true })
	publicKey: KeyObject;
}
