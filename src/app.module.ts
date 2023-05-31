import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { getEnvConfig } from "./config/env_config";
import { BlockchainModule } from "./blockchain/blockchain.module";
import { BlockModule } from "./block/block.module";
import { AccountModule } from "./account/account.module";
import { SignatureModule } from "./signature/signature.module";
import { AuthModule } from "./auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./auth/guard/jwtAuth.guard";

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: getEnvConfig(),
			isGlobal: true,
		}),
		DatabaseModule,
		BlockchainModule,
		BlockModule,
		AccountModule,
		SignatureModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
