import { ConfigType } from '@nestjs/config';
// Modules
import { BadRequestException, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
// Controllers
import { UploadController } from './controllers/upload.controller';
// Services
import { UploadService } from './services/upload.service';
// External libraries
import { v2 } from 'cloudinary';
// Env. App
import envApp from '@/app/app.env';

@Module({
  imports: [
    MulterModule.register({
      fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
          return cb(
            new BadRequestException(
              'Only image with ext. jpg, jpge, png and gif',
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  ],
  controllers: [UploadController],
  providers: [
    {
      provide: 'Cloudinary',
      useFactory: (envConfig: ConfigType<typeof envApp>) => {
        const { name, api_key, secret } = envConfig.cloudinary;
        return v2.config({
          cloud_name: name,
          api_key,
          api_secret: secret,
          secure: true,
        });
      },
      inject: [envApp.KEY],
    },
    UploadService,
  ],
})
export class CloudinaryModule {}
