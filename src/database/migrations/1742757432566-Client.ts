import { MigrationInterface, QueryRunner } from "typeorm";

export class Client1742757432566 implements MigrationInterface {
    name = 'Client1742757432566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user_address" (
                "id" SERIAL NOT NULL,
                "user_id" integer NOT NULL,
                "street_number" character varying NOT NULL,
                "street" character varying NOT NULL,
                "city" character varying NOT NULL,
                "postal_code" character varying NOT NULL,
                "country" character varying NOT NULL,
                "is_default" boolean NOT NULL DEFAULT false,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" integer,
                CONSTRAINT "PK_302d96673413455481d5ff4022a" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "user_address"
            ADD CONSTRAINT "FK_1abd8badc4a127b0f357d9ecbc2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_address" DROP CONSTRAINT "FK_1abd8badc4a127b0f357d9ecbc2"
        `);
        await queryRunner.query(`
            DROP TABLE "user_address"
        `);
    }

}
