import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewUserStatus1662057751596 implements MigrationInterface {
  name = 'AddNewUserStatus1662057751596';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`status\` \`status\` enum ('PASSPORT_UPLOAD', 'MARKS_UPLOAD', 'DIRECTIONS_UPLOAD', 'AWAITING_RESULT', 'GET_RESULT') NOT NULL DEFAULT 'PASSPORT_UPLOAD'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`status\` \`status\` enum ('PASSPORT_UPLOAD', 'MARKS_UPLOAD', 'DIRECTIONS_UPLOAD') NOT NULL DEFAULT 'PASSPORT_UPLOAD'`,
    );
  }
}
