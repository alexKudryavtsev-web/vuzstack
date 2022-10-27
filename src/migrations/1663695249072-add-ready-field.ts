import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddReadyColumn1663695249072 implements MigrationInterface {
  name = 'AddReadyColumn1663695249072';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`profile_entity\` ADD \`ready\` tinyint NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`profile_entity\` DROP COLUMN \`ready\``,
    );
  }
}
