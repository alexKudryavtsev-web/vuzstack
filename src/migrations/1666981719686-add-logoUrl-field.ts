import { MigrationInterface, QueryRunner } from "typeorm";

export class addLogoUrlField1666981719686 implements MigrationInterface {
    name = 'addLogoUrlField1666981719686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vuz\` ADD \`logoUrl\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`vuz\` DROP COLUMN \`logoUrl\``);
    }

}
