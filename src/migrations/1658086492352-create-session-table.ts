import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSession1658086492352 implements MigrationInterface {
  name = 'CreateSession1658086492352';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `session_entity` (`id` int NOT NULL AUTO_INCREMENT, `ip` varchar(255) NOT NULL, `refreshToken` varchar(255) NOT NULL, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `userId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `session_entity` ADD CONSTRAINT `FK_8118675718bebb455bba4caf129` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `session_entity` DROP FOREIGN KEY `FK_8118675718bebb455bba4caf129`',
    );
    await queryRunner.query('DROP TABLE `session_entity`');
  }
}
