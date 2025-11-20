import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1763671772845 implements MigrationInterface {
    name = 'InitialSchema1763671772845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tipo_producto" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "descripcion" character varying NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "PK_d62b06089b9920ad82b217cba97" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "producto" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "descripcion" character varying NOT NULL, "precio" numeric(10,2) NOT NULL DEFAULT '0', "enExposicion" boolean NOT NULL DEFAULT true, "imagenUrl" character varying, "deletedAt" TIMESTAMP, "tipoProductoId" integer NOT NULL, CONSTRAINT "PK_5be023b11909fe103e24c740c7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'admin')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "deletedAt" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_c895bdba11a5ec9739011392e90" FOREIGN KEY ("tipoProductoId") REFERENCES "tipo_producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_1e9f24a68bd2dcd6390a4008395" FOREIGN KEY ("productId") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_1e9f24a68bd2dcd6390a4008395"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_c895bdba11a5ec9739011392e90"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "producto"`);
        await queryRunner.query(`DROP TABLE "tipo_producto"`);
    }

}
