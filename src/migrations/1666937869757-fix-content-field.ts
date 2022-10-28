import { MigrationInterface, QueryRunner } from "typeorm";

export class fixContentField1666937869757 implements MigrationInterface {
    name = 'fixContentField1666937869757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_efd44e26299f0c3a1c3df23efb\` ON \`vuz\``);
        await queryRunner.query(`DROP INDEX \`IDX_d35f3d13ce29f79e00faafa136\` ON \`directions\``);
        await queryRunner.query(`ALTER TABLE \`articles\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`articles\` ADD \`content\` longtext NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`articles\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`articles\` ADD \`content\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_d35f3d13ce29f79e00faafa136\` ON \`directions\` (\`articleId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_efd44e26299f0c3a1c3df23efb\` ON \`vuz\` (\`articleId\`)`);
    }

}
