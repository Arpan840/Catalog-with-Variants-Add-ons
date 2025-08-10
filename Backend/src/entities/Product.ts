import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ProductType } from "./ProductType";
import { Variant } from "./Variant";
import { Addon } from "./Addon";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column({ type: "text", nullable: true })
  description!: string;

  @Column("text", { array: true, nullable: true })
  images!: string[];

  @ManyToOne(() => ProductType, (productType) => productType.products, {
    onDelete: "CASCADE",
  })
  productType!: ProductType;

  @OneToMany(() => Variant, (variant) => variant.product)
  variants!: Variant[];

  @OneToMany(() => Addon, (addon) => addon.product)
  addons!: Addon[];

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
