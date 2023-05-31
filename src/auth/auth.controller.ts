import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./decorator/public.decorator";
import { CredentialsDto } from "./dto/credentials.dto";
import { SignInResponseDto } from "./dto/signInResponse.dto";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}
	@Public()
	@Post("signup")
	@HttpCode(HttpStatus.CREATED)
	async signUp(@Body() data: CredentialsDto): Promise<void> {
		await this.authService.signUp(data);
	}

	@Public()
	@Post("login")
	@HttpCode(HttpStatus.OK)
	login(@Body() data: CredentialsDto): Promise<SignInResponseDto> {
		return this.authService.signIn(data);
	}
}
