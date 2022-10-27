import { MigrationInterface, QueryRunner } from 'typeorm';

export class createArticleTableAndDropVuzDirectionField1666893615061
  implements MigrationInterface
{
  name = 'createArticleTableAndDropVuzDirectionField1666893615061';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`articles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`type\` enum ('PLATFORM_DESCRIPTION', 'VUZ_DESCRIPTION', 'DIRECTION_DESCRIPTION') NOT NULL DEFAULT 'PLATFORM_DESCRIPTION', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`vuz\` DROP COLUMN \`article\``);
    await queryRunner.query(
      `ALTER TABLE \`directions\` DROP COLUMN \`article\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`directions\` ADD \`article\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vuz\` ADD \`article\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE \`articles\``);
  }
}
