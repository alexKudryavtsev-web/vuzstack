import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixRelationBetweenMarkAndUser1660072015168
  implements MigrationInterface
{
  name = 'FixRelationBetweenMarkAndUser1660072015168';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`markId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_57e3b1044596e3da6ad8012d0c\` (\`markId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_57e3b1044596e3da6ad8012d0c\` ON \`users\` (\`markId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_57e3b1044596e3da6ad8012d0c8\` FOREIGN KEY (\`markId\`) REFERENCES \`marks\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_57e3b1044596e3da6ad8012d0c8\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_57e3b1044596e3da6ad8012d0c\` ON \`users\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP INDEX \`IDX_57e3b1044596e3da6ad8012d0c\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`markId\``);
  }
}
