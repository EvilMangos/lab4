import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { CryptoService } from "./crypto.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { AccountModule } from "../account/account.module";
import { SignatureModule } from "../signature/signature.module";

@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get("JWT_SECRET"),
				signOptions: { expiresIn: configService.get("JWT_EXPIRES") },
			}),
			inject: [ConfigService],
		}),
		AccountModule,
		SignatureModule,
	],
	controllers: [AuthController],
	providers: [AuthService, CryptoService, JwtStrategy],
})
export class AuthModule {}
