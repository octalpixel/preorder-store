import { MigrationInterface, QueryRunner } from 'typeorm';
import { Migration } from 'medusa-extender';

@Migration()
export class BannerMigration1668916109122 implements MigrationInterface {
    name = 'BannerMigration1668916109122';
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        const query = `CREATE TABLE "public"."banner" (
            "id" varchar NOT NULL,
            "title" varchar,
            "metadata" jsonb,
            "delete_at" timestamptz,
            "created_at" timestamptz,
            "updated_at" timestamptz,
            "image_id" varchar,
            PRIMARY KEY ("id")
        );`;
        await queryRunner.query(query);
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        const query = '';
        await queryRunner.query(query);
    }
}