import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMigration1580896181071 implements MigrationInterface {
    name = 'UserMigration1580896181071'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` ADD `email` varchar(255) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `email`", undefined);
    }

}
