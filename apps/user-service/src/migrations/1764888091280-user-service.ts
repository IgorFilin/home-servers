import { MigrationInterface, QueryRunner } from "typeorm";

export class UserService1764888091280 implements MigrationInterface {
    name = 'UserService1764888091280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "refresh_token" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "userId" uuid NOT NULL,
                "hashedToken" character varying NOT NULL,
                "deviceId" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "authToken"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "ip" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "isAcceptKey"
            SET DEFAULT false
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "userPhoto" DROP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "refresh_token"
            ADD CONSTRAINT "FK_8e913e288156c133999341156ad" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "refresh_token" DROP CONSTRAINT "FK_8e913e288156c133999341156ad"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "userPhoto"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "isAcceptKey" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "ip"
            SET NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "authToken" character varying NOT NULL
        `);
        await queryRunner.query(`
            DROP TABLE "refresh_token"
        `);
    }

}
