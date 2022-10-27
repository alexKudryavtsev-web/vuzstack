import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixRelationBetweenUserAndMark1660069889132
  implements MigrationInterface
{
  name = 'FixRelationBetweenUserAndMark1660069889132';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`marks\` DROP FOREIGN KEY \`FK_e21a0fc27837fcc49166f565478\``,
    );
    await queryRunner.query(`ALTER TABLE \`marks\` DROP COLUMN \`userId\``);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`marks\` ADD \`userId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`marks\` ADD CONSTRAINT \`FK_e21a0fc27837fcc49166f565478\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
