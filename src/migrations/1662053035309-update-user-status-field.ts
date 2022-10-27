import { MigrationInterface, QueryRunner } from 'typeorm';

export class Fix1662053035309 implements MigrationInterface {
  name = 'Fix1662053035309';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`status\` \`status\` enum ('PASSPORT_UPLOAD', 'MARKS_UPLOAD', 'DIRECTIONS_UPLOAD') NOT NULL DEFAULT 'PASSPORT_UPLOAD'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`status\` \`status\` enum ('PASSPORT_UPLOAD', 'EXAMS_UPLOAD', 'DIRECTION_UPLOAD') NOT NULL DEFAULT 'PASSPORT_UPLOAD'`,
    );
  }
}
