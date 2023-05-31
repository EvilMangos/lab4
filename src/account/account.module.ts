import { Module } from "@nestjs/common";
import { AccountService } from "./account.service";
import { AccountController } from "./account.controller";
import { SignatureModule } from "../signature/signature.module";
import { DatabaseModule } from "../database/database.module";
import { BlockchainModule } from "../blockchain/blockchain.module";

@Module({
	imports: [SignatureModule, DatabaseModule, BlockchainModule],
	providers: [AccountService],
	controllers: [AccountController],
	exports: [AccountService],
})
export class AccountModule {}
