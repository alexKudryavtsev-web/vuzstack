import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateProfileAndUser1663417565912 implements MigrationInterface {
  name = 'UpdateProfileAndUser1663417565912';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_b1bda35cdb9a2c1b777f5541d8\` ON \`users\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`profile_entity\` DROP COLUMN \`ready\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`firstName\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`lastName\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`isVerified\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`acceptedWithCookie\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`status\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`status\` enum ('PASSPORT_UPLOAD', 'MARKS_UPLOAD', 'DIRECTIONS_UPLOAD', 'AWAITING_RESULT', 'GET_RESULT') NOT NULL DEFAULT 'PASSPORT_UPLOAD'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`acceptedWithCookie\` tinyint NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`isVerified\` tinyint NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`lastName\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`firstName\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`profile_entity\` ADD \`ready\` tinyint NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_b1bda35cdb9a2c1b777f5541d8\` ON \`users\` (\`profileId\`)`,
    );
  }
}
