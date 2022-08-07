import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAgree1658835574554 implements MigrationInterface {
  name = 'AddAgree1658835574554';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `users` ADD `agree` tinyint NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `users` DROP COLUMN `agree`');
  }
}
