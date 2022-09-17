import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

export enum ImageType {
  AVATAR = 'avatar',
  PASSPORT = 'passport',
}

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
  }

  async uploadFile(
    currentUserId: number,
    file: Express.Multer.File,
    type: ImageType = ImageType.AVATAR,
  ): Promise<void> {
    const stream = cloudinary.uploader.upload_stream({
      folder: type,
      public_id: calculatePublicId(currentUserId, type),
    });

    streamifier.createReadStream(file.buffer).pipe(stream);
  }

  async getURL(
    userId: number,
    type: ImageType = ImageType.AVATAR,
  ): Promise<string | null> {
    return cloudinary.search
      .expression(`public_id:${type}/${calculatePublicId(userId, type)}`)
      .execute()
      .then((result: any) => result.resources[0]?.url ?? null);
  }
}

function calculatePublicId(userId: number, type: ImageType = ImageType.AVATAR) {
  return `${type}-${userId}`;
}
