import {MigrationInterface, QueryRunner} from "typeorm";

export class userTableUpdatePasswordLength1601379590895 implements MigrationInterface {
    name = 'userTableUpdatePasswordLength1601379590895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `password`");
        await queryRunner.query("ALTER TABLE `user` ADD `password` varchar(100) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `password`");
        await queryRunner.query("ALTER TABLE `user` ADD `password` varchar(50) NOT NULL");
    }

}
