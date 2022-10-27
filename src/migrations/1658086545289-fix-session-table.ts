import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixSession1658086545289 implements MigrationInterface {
  name = 'FixSession1658086545289';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `sessions` (`id` int NOT NULL AUTO_INCREMENT, `ip` varchar(255) NOT NULL, `refreshToken` varchar(255) NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.dropTable('session_entity');
    await queryRunner.query(
      'ALTER TABLE `sessions` ADD CONSTRAINT `FK_57de40bc620f456c7311aa3a1e6` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `sessions` DROP FOREIGN KEY `FK_57de40bc620f456c7311aa3a1e6`',
    );
    await queryRunner.query('DROP TABLE `sessions`');
  }
}
