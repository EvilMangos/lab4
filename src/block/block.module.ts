import { Module } from "@nestjs/common";
import { BlockService } from "./block.service";
import { DatabaseModule } from "../database/database.module";
import { HashService } from "./hash.service";

@Module({
	imports: [DatabaseModule],
	providers: [BlockService, HashService],
	exports: [BlockService],
})
export class BlockModule {}
