import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcryptjs from "bcryptjs";

export class CreateAdminUser1234567890123 implements MigrationInterface {
    name = 'CreateAdminUser1234567890123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        const passwordHash = await bcryptjs.hash('adm123', 10);
        
        await queryRunner.query(`
            INSERT INTO "user" (name, email, password, role, "createdAt", "updatedAt") 
            VALUES (
                'adm', 
                'adm@adm.com', 
                '${passwordHash}', 
                'admin',
                NOW(),
                NOW()
            )
            ON CONFLICT (email) DO NOTHING
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "user" WHERE email = 'adm@adm.com'`);
    }
}