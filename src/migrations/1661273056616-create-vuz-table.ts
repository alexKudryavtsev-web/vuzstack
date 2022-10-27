import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVuz1661273056616 implements MigrationInterface {
  name = 'CreateVuz1661273056616';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`vuz\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`article\` varchar(255) NOT NULL, \`type\` enum ('university', 'academy', 'institute') NOT NULL DEFAULT 'institute', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`vuz\``);
  }
}
