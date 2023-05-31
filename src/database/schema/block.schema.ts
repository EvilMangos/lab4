import { SchemaFactory } from "@nestjs/mongoose";
import { BlockDto } from "../../block/dto/block.dto";

export const BlockSchema = SchemaFactory.createForClass(BlockDto);
