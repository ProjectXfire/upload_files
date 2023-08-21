import {
  Body,
  Controller,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
// Services
import { UploadService } from '../services/upload.service';
import { ImagesDto } from '../dtos/images.dto';
// Dtos

@Controller('cloudinary')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Query('folder') folder?: string,
  ) {
    return this.uploadService.uploadImages(files, folder);
  }

  @Post('delete')
  deleteImages(@Body() body: ImagesDto) {
    return this.uploadService.deleteImages(body);
  }
}
