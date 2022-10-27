import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfile1663414576191 implements MigrationInterface {
  name = 'CreateProfile1663414576191';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`profile_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL DEFAULT '', \`lastName\` varchar(255) NOT NULL DEFAULT '', \`phone\` varchar(255) NOT NULL DEFAULT '', \`link\` varchar(255) NOT NULL DEFAULT '', \`snils\` varchar(255) NOT NULL DEFAULT '', \`passportID\` varchar(255) NOT NULL DEFAULT '', \`passportSeries\` varchar(255) NOT NULL DEFAULT '', \`ready\` tinyint NOT NULL DEFAULT 0, \`acceptedWithCookie\` tinyint NULL, \`passport\` varchar(255) NULL, \`avatar\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`profileId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_b1bda35cdb9a2c1b777f5541d8\` (\`profileId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_b1bda35cdb9a2c1b777f5541d8\` ON \`users\` (\`profileId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_b1bda35cdb9a2c1b777f5541d87\` FOREIGN KEY (\`profileId\`) REFERENCES \`profile_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_b1bda35cdb9a2c1b777f5541d87\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_b1bda35cdb9a2c1b777f5541d8\` ON \`users\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP INDEX \`IDX_b1bda35cdb9a2c1b777f5541d8\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`profileId\``);
    await queryRunner.query(`DROP TABLE \`profile_entity\``);
  }
}
