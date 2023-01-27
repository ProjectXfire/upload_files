// Modules
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
// Env. app
import envApp from './app.env';

@Module({
  imports: [
    CloudinaryModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [envApp],
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
