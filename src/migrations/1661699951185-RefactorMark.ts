import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorMark1661699951185 implements MigrationInterface {
  name = 'RefactorMark1661699951185';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`marks\` DROP COLUMN \`achievements\``,
    );
    await queryRunner.query(`ALTER TABLE \`marks\` DROP COLUMN \`createdAt\``);
    await queryRunner.query(`ALTER TABLE \`marks\` DROP COLUMN \`exams\``);
    await queryRunner.query(`ALTER TABLE \`marks\` DROP COLUMN \`updatedAt\``);
    await queryRunner.query(
      `ALTER TABLE \`marks\` ADD \`exam\` enum ('RUSSIAN_LANGUAGE', 'MATH', 'PHYSIC', 'CHEMISTRY', 'HISTORY', 'SOCIAL_SCIENCE', 'COMPUTER_SCIENCE', 'BIOLOGY', 'FOREIGN_LANGUAGE') NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`marks\` ADD \`result\` int NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`marks\` ADD \`userId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`marks\` ADD CONSTRAINT \`FK_e21a0fc27837fcc49166f565478\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`marks\` DROP FOREIGN KEY \`FK_e21a0fc27837fcc49166f565478\``,
    );
    await queryRunner.query(`ALTER TABLE \`marks\` DROP COLUMN \`userId\``);
    await queryRunner.query(`ALTER TABLE \`marks\` DROP COLUMN \`result\``);
    await queryRunner.query(`ALTER TABLE \`marks\` DROP COLUMN \`exam\``);
    await queryRunner.query(
      `ALTER TABLE \`marks\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`marks\` ADD \`exams\` text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`marks\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`marks\` ADD \`achievements\` text NOT NULL`,
    );
  }
}
