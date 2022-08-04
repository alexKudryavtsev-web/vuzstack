import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { getLogger } from 'nodemailer/lib/shared';
import * as streamifier from 'streamifier';

@Injectable()
export class AvatarService {
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
  ): Promise<void> {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'avatars',
        public_id: String(currentUserId),
      },
      function (error, result) {
        const logger = getLogger();

        if (error) {
          logger.error(error);
        } else {
          logger.info(result);
        }
      },
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  }

  async getFile(userId: number): Promise<string | null> {
    return cloudinary.search
      .expression(String(userId))
      .execute()
      .then((result: any) => result.resources[0]?.url ?? null);
  }
}
