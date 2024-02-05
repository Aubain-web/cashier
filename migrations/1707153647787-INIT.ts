import { MigrationInterface, QueryRunner } from "typeorm";

export class INIT1707153647787 implements MigrationInterface {
    name = 'INIT1707153647787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`pic\` varchar(255) NOT NULL, \`category\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tables\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`posX\` int NOT NULL, \`posY\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` bigint NOT NULL, \`status\` int NOT NULL DEFAULT '0', \`total_price\` int NOT NULL, \`date_start\` datetime NOT NULL, \`date_end\` datetime NOT NULL, \`tableId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders_products_products\` (\`ordersId\` bigint NOT NULL, \`productsId\` int NOT NULL, INDEX \`IDX_dbab812991c32a735a34748370\` (\`ordersId\`), INDEX \`IDX_af9cb00de5ab2af01a6a325343\` (\`productsId\`), PRIMARY KEY (\`ordersId\`, \`productsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_2a7fdd7af437285a3ef0fc8b64f\` FOREIGN KEY (\`tableId\`) REFERENCES \`tables\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders_products_products\` ADD CONSTRAINT \`FK_dbab812991c32a735a34748370c\` FOREIGN KEY (\`ordersId\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`orders_products_products\` ADD CONSTRAINT \`FK_af9cb00de5ab2af01a6a3253435\` FOREIGN KEY (\`productsId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders_products_products\` DROP FOREIGN KEY \`FK_af9cb00de5ab2af01a6a3253435\``);
        await queryRunner.query(`ALTER TABLE \`orders_products_products\` DROP FOREIGN KEY \`FK_dbab812991c32a735a34748370c\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_2a7fdd7af437285a3ef0fc8b64f\``);
        await queryRunner.query(`DROP INDEX \`IDX_af9cb00de5ab2af01a6a325343\` ON \`orders_products_products\``);
        await queryRunner.query(`DROP INDEX \`IDX_dbab812991c32a735a34748370\` ON \`orders_products_products\``);
        await queryRunner.query(`DROP TABLE \`orders_products_products\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
        await queryRunner.query(`DROP TABLE \`tables\``);
        await queryRunner.query(`DROP TABLE \`products\``);
    }

}
