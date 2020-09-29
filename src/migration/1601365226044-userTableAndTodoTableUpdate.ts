import {MigrationInterface, QueryRunner} from "typeorm";

export class userTableAndTodoTableUpdate1601365226044 implements MigrationInterface {
    name = 'userTableAndTodoTableUpdate1601365226044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(50) NOT NULL, `email` varchar(60) NOT NULL, `password` varchar(50) NOT NULL, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `todo` ADD `userId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `todo` ADD CONSTRAINT `FK_1e982e43f63a98ad9918a86035c` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `todo` DROP FOREIGN KEY `FK_1e982e43f63a98ad9918a86035c`");
        await queryRunner.query("ALTER TABLE `todo` DROP COLUMN `userId`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
