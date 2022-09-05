import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRelationsBetweenUserAndDirections1661507669532
  implements MigrationInterface
{
  name = 'AddRelationsBetweenUserAndDirections1661507669532';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users_directions_directions\` (\`usersId\` int NOT NULL, \`directionsId\` int NOT NULL, INDEX \`IDX_6441f1694c8780caa5b5d862f9\` (\`usersId\`), INDEX \`IDX_837792fa5651877d781add2566\` (\`directionsId\`), PRIMARY KEY (\`usersId\`, \`directionsId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`users\` ADD \`priority\` text`);
    await queryRunner.query(
      `ALTER TABLE \`users_directions_directions\` ADD CONSTRAINT \`FK_6441f1694c8780caa5b5d862f90\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_directions_directions\` ADD CONSTRAINT \`FK_837792fa5651877d781add25668\` FOREIGN KEY (\`directionsId\`) REFERENCES \`directions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users_directions_directions\` DROP FOREIGN KEY \`FK_837792fa5651877d781add25668\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_directions_directions\` DROP FOREIGN KEY \`FK_6441f1694c8780caa5b5d862f90\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`priority\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_837792fa5651877d781add2566\` ON \`users_directions_directions\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_6441f1694c8780caa5b5d862f9\` ON \`users_directions_directions\``,
    );
    await queryRunner.query(`DROP TABLE \`users_directions_directions\``);
  }
}
