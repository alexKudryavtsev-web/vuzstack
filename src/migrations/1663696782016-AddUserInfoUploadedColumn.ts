import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserInfoUploadedColumn1663696782016
  implements MigrationInterface
{
  name = 'AddUserInfoUploadedColumn1663696782016';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`profile_entity\` ADD \`userInfoUploaded\` tinyint NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`profile_entity\` DROP COLUMN \`userInfoUploaded\``,
    );
  }
}
