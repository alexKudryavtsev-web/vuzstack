import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationBetweenExamAndUser1661453193317
  implements MigrationInterface
{
  name = 'AddRelationBetweenExamAndUser1661453193317';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`exam\` ADD \`userId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`exam\` ADD CONSTRAINT \`FK_27622fbe99d85dc11b081f64a12\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`exam\` DROP FOREIGN KEY \`FK_27622fbe99d85dc11b081f64a12\``,
    );
    await queryRunner.query(`ALTER TABLE \`exam\` DROP COLUMN \`userId\``);
  }
}
