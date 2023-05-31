import { IsEmail, IsNotEmpty } from "class-validator";

export class CredentialsDto {
	@IsNotEmpty()
	@IsEmail()
	login: string;
	@IsNotEmpty()
	password: string;
}
