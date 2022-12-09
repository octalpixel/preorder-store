import { Column, Entity, BeforeInsert, OneToOne, JoinColumn } from "typeorm"; 
import { Entity as MedusaEntity } from "medusa-extender";
import { Image, SoftDeletableEntity } from "@medusajs/medusa";
import { generateEntityId } from "@medusajs/medusa/dist/utils";
import { DbAwareColumn } from "@medusajs/medusa/dist/utils/db-aware-column"

@MedusaEntity()
@Entity('banner')
export class Banner extends SoftDeletableEntity {
    @Column()
    title: string;

    @OneToOne(() => Image)
    @JoinColumn({ name: "image_id" })
    image: Image;

    @DbAwareColumn({ type: "jsonb", nullable: true })
    metadata: Record<string, unknown>

    @BeforeInsert()
    private beforeInsert(): void {
      this.id = generateEntityId(this.id, "bnr")
    }
}