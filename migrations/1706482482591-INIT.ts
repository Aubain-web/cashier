import { MigrationInterface, QueryRunner } from "typeorm";

export class INIT1706482482591 implements MigrationInterface {
    name = 'INIT1706482482591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`pic\` varchar(255) NOT NULL, \`category\` int NOT NULL, \`productCategoryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payment_method\` (\`id\` int NOT NULL AUTO_INCREMENT, \`method\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` int NOT NULL, \`total_price\` int NOT NULL, \`date_start\` int NOT NULL, \`date_end\` int NOT NULL, \`paymentMethodId\` int NULL, \`tableId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`table_schema\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`table\` (\`id\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(255) NOT NULL, \`posX\` int NOT NULL, \`posY\` int NOT NULL, \`tableSchemaId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_products_product\` (\`orderId\` int NOT NULL, \`productId\` int NOT NULL, INDEX \`IDX_1f9ea0b0e59e0d98ade4f2d5e9\` (\`orderId\`), INDEX \`IDX_d6c66c08b9c7e84a1b657797df\` (\`productId\`), PRIMARY KEY (\`orderId\`, \`productId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_618194d24a7ea86a165d7ec628e\` FOREIGN KEY (\`productCategoryId\`) REFERENCES \`product_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_89726ee65618314009b279e66e8\` FOREIGN KEY (\`paymentMethodId\`) REFERENCES \`payment_method\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_a9757413db9333d4bb21a2a42aa\` FOREIGN KEY (\`tableId\`) REFERENCES \`table\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`table\` ADD CONSTRAINT \`FK_fd0497360ed5b605c1725b7c92b\` FOREIGN KEY (\`tableSchemaId\`) REFERENCES \`table_schema\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_products_product\` ADD CONSTRAINT \`FK_1f9ea0b0e59e0d98ade4f2d5e99\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`order_products_product\` ADD CONSTRAINT \`FK_d6c66c08b9c7e84a1b657797dff\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_products_product\` DROP FOREIGN KEY \`FK_d6c66c08b9c7e84a1b657797dff\``);
        await queryRunner.query(`ALTER TABLE \`order_products_product\` DROP FOREIGN KEY \`FK_1f9ea0b0e59e0d98ade4f2d5e99\``);
        await queryRunner.query(`ALTER TABLE \`table\` DROP FOREIGN KEY \`FK_fd0497360ed5b605c1725b7c92b\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_a9757413db9333d4bb21a2a42aa\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_89726ee65618314009b279e66e8\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_618194d24a7ea86a165d7ec628e\``);
        await queryRunner.query(`DROP INDEX \`IDX_d6c66c08b9c7e84a1b657797df\` ON \`order_products_product\``);
        await queryRunner.query(`DROP INDEX \`IDX_1f9ea0b0e59e0d98ade4f2d5e9\` ON \`order_products_product\``);
        await queryRunner.query(`DROP TABLE \`order_products_product\``);
        await queryRunner.query(`DROP TABLE \`table\``);
        await queryRunner.query(`DROP TABLE \`table_schema\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`payment_method\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`product_category\``);
    }

}
