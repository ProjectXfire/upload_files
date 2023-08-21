import { InternalServerErrorException, Injectable } from '@nestjs/common';
// External libraries
import { UploadApiResponse, v2 } from 'cloudinary';
// Dtos
import { ImagesDto } from '../dtos/images.dto';

@Injectable()
export class UploadService {
  async uploadImages(files: Array<Express.Multer.File>, folder?: string) {
    try {
      const uploadingImages = files
        .map(
          (file) =>
            `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
        )
        .map(
          (base64File) =>
            new Promise<UploadApiResponse>((resolve, reject) => {
              v2.uploader
                .upload(base64File, { folder: folder ?? '' })
                .then((res) => resolve(res))
                .catch((err) => reject(err));
            }),
        );
      const response = await Promise.all(uploadingImages);
      return response.map((res) => ({
        public_id: res.public_id,
        secure_url: res.secure_url,
      }));
    } catch (error) {
      throw new InternalServerErrorException('Error on upload images');
    }
  }

  async deleteImages(body: ImagesDto) {
    try {
      const { images } = body;
      const deletingImages = images.map(
        (img) =>
          new Promise((resolve, reject) => {
            v2.uploader.destroy(
              img.public_id,
              { resource_type: 'image' },
              (err, result) => {
                if (err) reject();
                resolve(result);
              },
            );
          }),
      );
      await Promise.all(deletingImages);
      return {
        message: 'Images have been deleted',
      };
    } catch (error) {
      throw new InternalServerErrorException('Error on delete images');
    }
  }
}
