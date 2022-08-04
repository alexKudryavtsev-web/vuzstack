import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixUser1658078238531 implements MigrationInterface {
  name = 'FixUser1658078238531';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `users` CHANGE `isActive` `isActived` tinyint NOT NULL DEFAULT '0'",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `users` CHANGE `isActived` `isActive` tinyint NOT NULL DEFAULT '0'",
    );
  }
}
