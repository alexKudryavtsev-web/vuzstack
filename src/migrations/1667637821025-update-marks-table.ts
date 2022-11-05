import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateMarksTable1667637821025 implements MigrationInterface {
  name = 'updateMarksTable1667637821025';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`marks\` CHANGE \`exam\` \`exam\` enum ('RUSSIAN_LANGUAGE', 'MATH', 'PHYSIC', 'CHEMISTRY', 'HISTORY', 'SOCIAL_SCIENCE', 'COMPUTER_SCIENCE', 'BIOLOGY', 'FOREIGN_LANGUAGE', 'GEOGRAPHY') NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`marks\` CHANGE \`exam\` \`exam\` enum ('RUSSIAN_LANGUAGE', 'MATH', 'PHYSIC', 'CHEMISTRY', 'HISTORY', 'SOCIAL_SCIENCE', 'COMPUTER_SCIENCE', 'BIOLOGY', 'FOREIGN_LANGUAGE') NOT NULL`,
    );
  }
}
