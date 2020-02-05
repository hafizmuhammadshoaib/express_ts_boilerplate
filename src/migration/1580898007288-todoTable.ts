import {MigrationInterface, QueryRunner} from "typeorm";

export class todoTable1580898007288 implements MigrationInterface {
    name = 'todoTable1580898007288'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `todo` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(25) NOT NULL, `item` varchar(250) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `todo`", undefined);
    }

}
