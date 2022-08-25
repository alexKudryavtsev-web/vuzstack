import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationsBetweenVuzAndDirection1661273751078
  implements MigrationInterface
{
  name = 'AddRelationsBetweenVuzAndDirection1661273751078';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`directions\` ADD \`vuzId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`directions\` ADD CONSTRAINT \`FK_94b3dbd2efcd38990d3aa83058a\` FOREIGN KEY (\`vuzId\`) REFERENCES \`vuz\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`directions\` DROP FOREIGN KEY \`FK_94b3dbd2efcd38990d3aa83058a\``,
    );
    await queryRunner.query(`ALTER TABLE \`directions\` DROP COLUMN \`vuzId\``);
  }
}
