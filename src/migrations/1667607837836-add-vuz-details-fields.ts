import { MigrationInterface, QueryRunner } from 'typeorm';

export class addVuzDetailsFields1667607837836 implements MigrationInterface {
  name = 'addVuzDetailsFields1667607837836';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`vuz\` DROP COLUMN \`name\``);
    await queryRunner.query(`ALTER TABLE \`vuz\` DROP COLUMN \`type\``);
    await queryRunner.query(
      `ALTER TABLE \`vuz\` ADD \`shortName\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vuz\` ADD \`fullName\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vuz\` ADD \`withHostel\` tinyint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vuz\` ADD \`numberOfStudents\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vuz\` ADD \`yearOfFoundation\` int NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`vuz\` DROP COLUMN \`yearOfFoundation\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`vuz\` DROP COLUMN \`numberOfStudents\``,
    );
    await queryRunner.query(`ALTER TABLE \`vuz\` DROP COLUMN \`withHostel\``);
    await queryRunner.query(`ALTER TABLE \`vuz\` DROP COLUMN \`fullName\``);
    await queryRunner.query(`ALTER TABLE \`vuz\` DROP COLUMN \`shortName\``);
    await queryRunner.query(
      `ALTER TABLE \`vuz\` ADD \`type\` enum ('university', 'academy', 'institute') NOT NULL DEFAULT 'institute'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`vuz\` ADD \`name\` varchar(255) NOT NULL`,
    );
  }
}
