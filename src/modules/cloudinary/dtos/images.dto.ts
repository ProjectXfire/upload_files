import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ImagesDto {
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => IImageDto)
  readonly images: IImageDto[];
}

export class IImageDto {
  @IsNotEmpty()
  @IsString()
  readonly secure_url: string;
  @IsNotEmpty()
  @IsString()
  readonly public_id: string;
}
