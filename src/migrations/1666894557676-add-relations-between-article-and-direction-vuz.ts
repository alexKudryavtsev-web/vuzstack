import { MigrationInterface, QueryRunner } from 'typeorm';

export class addRelationsBetweenArticleAndDirectionVuz1666894557676
  implements MigrationInterface
{
  name = 'addRelationsBetweenArticleAndDirectionVuz1666894557676';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`vuz\` ADD \`articleId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`vuz\` ADD UNIQUE INDEX \`IDX_efd44e26299f0c3a1c3df23efb\` (\`articleId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`directions\` ADD \`articleId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`directions\` ADD UNIQUE INDEX \`IDX_d35f3d13ce29f79e00faafa136\` (\`articleId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_efd44e26299f0c3a1c3df23efb\` ON \`vuz\` (\`articleId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_d35f3d13ce29f79e00faafa136\` ON \`directions\` (\`articleId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vuz\` ADD CONSTRAINT \`FK_efd44e26299f0c3a1c3df23efbd\` FOREIGN KEY (\`articleId\`) REFERENCES \`articles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`directions\` ADD CONSTRAINT \`FK_d35f3d13ce29f79e00faafa136f\` FOREIGN KEY (\`articleId\`) REFERENCES \`articles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`directions\` DROP FOREIGN KEY \`FK_d35f3d13ce29f79e00faafa136f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`vuz\` DROP FOREIGN KEY \`FK_efd44e26299f0c3a1c3df23efbd\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_d35f3d13ce29f79e00faafa136\` ON \`directions\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_efd44e26299f0c3a1c3df23efb\` ON \`vuz\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`directions\` DROP INDEX \`IDX_d35f3d13ce29f79e00faafa136\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`directions\` DROP COLUMN \`articleId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`vuz\` DROP INDEX \`IDX_efd44e26299f0c3a1c3df23efb\``,
    );
    await queryRunner.query(`ALTER TABLE \`vuz\` DROP COLUMN \`articleId\``);
  }
}
