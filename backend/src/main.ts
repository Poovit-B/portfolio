import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix
  app.setGlobalPrefix("api");

  // CORS - allow GitHub Pages and localhost
  app.enableCors({
    origin: [
      "https://poovit-b.github.io",
      "http://localhost:5173",
      "http://localhost:3000",
      process.env.FRONTEND_URL,
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // Swagger API docs
  const config = new DocumentBuilder()
    .setTitle("Portfolio API")
    .setDescription("Portfolio Backend API with Analytics Dashboard")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  const port = process.env.PORT || 4000;

  // Listen on 0.0.0.0 for Railway/Docker
  await app.listen(port, "0.0.0.0");

  console.log(`🚀 Server running on port ${port}`);
  console.log(`📚 Swagger docs: /api/docs`);
}
bootstrap();
