import { MigrationInterface, QueryRunner } from 'typeorm';

export class addIsProcessedColumn1665260218767 implements MigrationInterface {
  name = 'addIsProcessedColumn1665260218767';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`isProcessed\` tinyint NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`isProcessed\``,
    );
  }
}
