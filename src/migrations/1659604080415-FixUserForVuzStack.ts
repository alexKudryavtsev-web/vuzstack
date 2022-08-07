import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixUserForVuzStack1659604080415 implements MigrationInterface {
  name = 'FixUserForVuzStack1659604080415';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`isActived\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`gender\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`isActivated\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`isVerified\` tinyint NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`updatedAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`createdAt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`isVerified\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`isActivated\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`gender\` enum ('male', 'women', 'other') NOT NULL DEFAULT 'other'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`isActived\` tinyint NOT NULL DEFAULT '0'`,
    );
  }
}
