import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDirectionDetailsField1667636849949
  implements MigrationInterface
{
  name = 'addDirectionDetailsField1667636849949';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`directions\` ADD \`code\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`directions\` ADD \`department\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`directions\` ADD \`profile\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`directions\` ADD \`type\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`directions\` DROP COLUMN \`type\``);
    await queryRunner.query(
      `ALTER TABLE \`directions\` DROP COLUMN \`profile\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`directions\` DROP COLUMN \`department\``,
    );
    await queryRunner.query(`ALTER TABLE \`directions\` DROP COLUMN \`code\``);
  }
}
