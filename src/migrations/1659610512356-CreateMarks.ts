import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMarks1659610512356 implements MigrationInterface {
  name = 'CreateMarks1659610512356';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`marks\` (\`id\` int NOT NULL AUTO_INCREMENT, \`exam\` text NOT NULL, \`achievements\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`marks\` ADD CONSTRAINT \`FK_e21a0fc27837fcc49166f565478\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`marks\` DROP FOREIGN KEY \`FK_e21a0fc27837fcc49166f565478\``,
    );
    await queryRunner.query(`DROP TABLE \`marks\``);
  }
}
