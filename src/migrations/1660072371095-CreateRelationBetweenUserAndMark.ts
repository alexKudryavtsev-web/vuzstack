import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRelationBetweenUserAndMark1660072371095
  implements MigrationInterface
{
  name = 'CreateRelationBetweenUserAndMark1660072371095';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_57e3b1044596e3da6ad8012d0c\` ON \`users\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_57e3b1044596e3da6ad8012d0c\` ON \`users\` (\`markId\`)`,
    );
  }
}
