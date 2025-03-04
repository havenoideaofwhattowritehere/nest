import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1741010226242 implements MigrationInterface {
    name = 'CreateTables1741010226242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`direction\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`experience\` (\`id\` varchar(36) NOT NULL, \`company_name\` varchar(255) NOT NULL, \`position\` varchar(255) NOT NULL, \`start_date\` datetime NOT NULL, \`end_date\` datetime NOT NULL, \`currently_working\` tinyint NOT NULL, \`description\` varchar(255) NOT NULL, \`employee_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project_history\` (\`id\` varchar(36) NOT NULL, \`project_name\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, \`start_date\` datetime NOT NULL, \`end_date\` datetime NOT NULL, \`description\` varchar(255) NOT NULL, \`employee_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`technology\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`is_custom\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employee_technology\` (\`id\` varchar(36) NOT NULL, \`employee_id\` varchar(36) NULL, \`technology_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`resume_version\` (\`id\` varchar(36) NOT NULL, \`version_type\` varchar(255) NOT NULL, \`file_path\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`resume_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`resume\` (\`id\` varchar(36) NOT NULL, \`file_path\` varchar(255) NOT NULL, \`created_at\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`employee_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employee\` (\`id\` varchar(36) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`secondName\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`birth\` datetime NOT NULL, \`hire_date\` datetime NOT NULL, \`direction_id\` varchar(255) NOT NULL, \`company_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_817d1d427138772d47eca04885\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`companyId\` varchar(36) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`experience\` ADD CONSTRAINT \`FK_832de6d725e285f179827888a27\` FOREIGN KEY (\`employee_id\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project_history\` ADD CONSTRAINT \`FK_77dab99e7df782af482f4fdd31c\` FOREIGN KEY (\`employee_id\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee_technology\` ADD CONSTRAINT \`FK_405f434ec18aba45b1193dbd0fc\` FOREIGN KEY (\`employee_id\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee_technology\` ADD CONSTRAINT \`FK_8c804c435f409c39c453a130295\` FOREIGN KEY (\`technology_id\`) REFERENCES \`technology\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`resume_version\` ADD CONSTRAINT \`FK_60dcf8f087fd2b3ed30ef7cf19d\` FOREIGN KEY (\`resume_id\`) REFERENCES \`resume\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`resume\` ADD CONSTRAINT \`FK_d9e7998ced834d3fbd56a41654b\` FOREIGN KEY (\`employee_id\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee\` ADD CONSTRAINT \`FK_3f25598a5f106392263f58a2eb2\` FOREIGN KEY (\`company_id\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`employee\` ADD CONSTRAINT \`FK_ce3f16259061820ca20a0bee5ae\` FOREIGN KEY (\`direction_id\`) REFERENCES \`direction\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_86586021a26d1180b0968f98502\` FOREIGN KEY (\`companyId\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_86586021a26d1180b0968f98502\``);
        await queryRunner.query(`ALTER TABLE \`employee\` DROP FOREIGN KEY \`FK_ce3f16259061820ca20a0bee5ae\``);
        await queryRunner.query(`ALTER TABLE \`employee\` DROP FOREIGN KEY \`FK_3f25598a5f106392263f58a2eb2\``);
        await queryRunner.query(`ALTER TABLE \`resume\` DROP FOREIGN KEY \`FK_d9e7998ced834d3fbd56a41654b\``);
        await queryRunner.query(`ALTER TABLE \`resume_version\` DROP FOREIGN KEY \`FK_60dcf8f087fd2b3ed30ef7cf19d\``);
        await queryRunner.query(`ALTER TABLE \`employee_technology\` DROP FOREIGN KEY \`FK_8c804c435f409c39c453a130295\``);
        await queryRunner.query(`ALTER TABLE \`employee_technology\` DROP FOREIGN KEY \`FK_405f434ec18aba45b1193dbd0fc\``);
        await queryRunner.query(`ALTER TABLE \`project_history\` DROP FOREIGN KEY \`FK_77dab99e7df782af482f4fdd31c\``);
        await queryRunner.query(`ALTER TABLE \`experience\` DROP FOREIGN KEY \`FK_832de6d725e285f179827888a27\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`company\``);
        await queryRunner.query(`DROP INDEX \`IDX_817d1d427138772d47eca04885\` ON \`employee\``);
        await queryRunner.query(`DROP TABLE \`employee\``);
        await queryRunner.query(`DROP TABLE \`resume\``);
        await queryRunner.query(`DROP TABLE \`resume_version\``);
        await queryRunner.query(`DROP TABLE \`employee_technology\``);
        await queryRunner.query(`DROP TABLE \`technology\``);
        await queryRunner.query(`DROP TABLE \`project_history\``);
        await queryRunner.query(`DROP TABLE \`experience\``);
        await queryRunner.query(`DROP TABLE \`direction\``);
    }

}
