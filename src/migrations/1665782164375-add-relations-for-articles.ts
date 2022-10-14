import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelationsForArticles1665782164375
  implements MigrationInterface
{
  name = 'addRelationsForArticles1665782164375';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`articles\` CHANGE \`title\` \`type\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`vuz\` DROP COLUMN \`article\``);
    await queryRunner.query(
      `ALTER TABLE \`directions\` DROP COLUMN \`article\``,
    );
    await queryRunner.query(`ALTER TABLE \`articles\` DROP COLUMN \`type\``);
    await queryRunner.query(
      `ALTER TABLE \`articles\` ADD \`type\` enum ('PLATFORM_DESCRIPTION', 'VUZ_DESCRIPTION', 'DIRECTION_DESCRIPTION') NOT NULL DEFAULT 'PLATFORM_DESCRIPTION'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`articles\` DROP COLUMN \`type\``);
    await queryRunner.query(
      `ALTER TABLE \`articles\` ADD \`type\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`directions\` ADD \`article\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vuz\` ADD \`article\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`articles\` CHANGE \`type\` \`title\` varchar(255) NOT NULL`,
    );
  }
}
