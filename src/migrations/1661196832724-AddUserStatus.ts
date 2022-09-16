import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserStatus1661196832724 implements MigrationInterface {
  name = 'AddUserStatus1661196832724';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`status\` enum ('PASSPORT_UPLOAD', 'EXAMS_UPLOAD', 'DIRECTION_UPLOAD') NOT NULL DEFAULT 'PASSPORT_UPLOAD'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`status\``);
  }
}
