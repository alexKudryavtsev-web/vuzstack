import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUser1658078014727 implements MigrationInterface {
  name = 'UpdateUser1658078014727';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `users` ADD `activationLink` varchar(255) NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `users` DROP COLUMN `activationLink`');
  }
}
