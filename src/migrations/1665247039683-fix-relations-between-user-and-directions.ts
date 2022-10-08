import { MigrationInterface, QueryRunner } from 'typeorm';

export class fixRelationsBetweenUserAndDirections1665247039683
  implements MigrationInterface
{
  name = 'fixRelationsBetweenUserAndDirections1665247039683';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`resultId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_6e594f7adffb913f769b14dcd6e\` FOREIGN KEY (\`resultId\`) REFERENCES \`directions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_6e594f7adffb913f769b14dcd6e\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`resultId\``);
  }
}
