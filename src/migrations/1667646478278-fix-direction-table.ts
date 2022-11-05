import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixDirectionTable1667646478278 implements MigrationInterface {
  name = 'fixDirectionTable1667646478278';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`directions\` DROP COLUMN \`department\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`directions\` ADD \`department\` longtext NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`directions\` DROP COLUMN \`profile\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`directions\` ADD \`profile\` longtext NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`directions\` DROP COLUMN \`profile\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`directions\` ADD \`profile\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`directions\` DROP COLUMN \`department\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`directions\` ADD \`department\` varchar(255) NOT NULL`,
    );
  }
}
