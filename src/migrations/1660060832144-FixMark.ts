import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixMark1660060832144 implements MigrationInterface {
  name = 'FixMark1660060832144';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`marks\` CHANGE \`exam\` \`exams\` text NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`marks\` CHANGE \`exams\` \`exam\` text NOT NULL`,
    );
  }
}
