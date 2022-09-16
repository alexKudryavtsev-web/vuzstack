import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultFirstNameAndLastName1663320964264
  implements MigrationInterface
{
  name = 'AddDefaultFirstNameAndLastName1663320964264';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`firstName\` \`firstName\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`lastName\` \`lastName\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`priority\` \`priority\` text NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`priority\` \`priority\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`lastName\` \`lastName\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`firstName\` \`firstName\` varchar(255) NOT NULL`,
    );
  }
}
