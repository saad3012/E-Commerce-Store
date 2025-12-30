import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  price: string;

  @Column({ type: 'longtext', nullable: true })
  image: string; // Base64 encoded image

  @CreateDateColumn()
  createdAt: Date;
}
