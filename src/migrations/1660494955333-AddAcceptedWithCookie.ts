import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAcceptedWithCookie1660494955333 implements MigrationInterface {
  name = 'AddAcceptedWithCookie1660494955333';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`acceptedWithCookie\` tinyint NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP COLUMN \`acceptedWithCookie\``,
    );
  }
}
