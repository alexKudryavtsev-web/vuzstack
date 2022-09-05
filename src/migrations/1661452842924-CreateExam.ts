import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExam1661452842924 implements MigrationInterface {
  name = 'CreateExam1661452842924';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`exam\` (\`id\` int NOT NULL AUTO_INCREMENT, \`exam\` enum ('russian_language', 'math', 'physic', 'chemistry', 'history', 'social_science', 'computer_science', 'biology', 'foreign_language') NOT NULL, \`result\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`exam\``);
  }
}
