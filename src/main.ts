import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);
	const PORT = configService.get("PORT");
	const HOST = configService.get("HOSTNAME");

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			skipUndefinedProperties: true,
		})
	);

	console.log(`Server listen on http://${HOST}:${PORT}`);
	await app.listen(3000);
}
bootstrap();
