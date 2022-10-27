import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddExams1661275514847 implements MigrationInterface {
  name = 'AddExams1661275514847';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`directions\` ADD \`requiredExams\` text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`directions\` ADD \`optionalExams\` text NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`directions\` DROP COLUMN \`optionalExams\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`directions\` DROP COLUMN \`requiredExams\``,
    );
  }
}
