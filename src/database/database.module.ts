import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { BlockDto } from "../block/dto/block.dto";
import { BlockSchema } from "./schema/block.schema";
import { AccountDto } from "../account/dto/account.dto";
import { AccountSchema } from "./schema/account.schema";
import { FileDbService } from "./fileDb.service";

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get("MONGODB_URI"),
			}),
			inject: [ConfigService],
		}),
		MongooseModule.forFeature([
			{ name: BlockDto.name, schema: BlockSchema },
			{ name: AccountDto.name, schema: AccountSchema },
		]),
	],
	providers: [DatabaseService, FileDbService],
	exports: [DatabaseService, FileDbService],
})
export class DatabaseModule {}
