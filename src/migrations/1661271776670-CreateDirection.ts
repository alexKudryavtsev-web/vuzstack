import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDirection1661271776670 implements MigrationInterface {
  name = 'CreateDirection1661271776670';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`directions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`article\` varchar(255) NOT NULL, \`budgetPlaces\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`directions\``);
  }
}
