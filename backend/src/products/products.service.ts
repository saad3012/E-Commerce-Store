import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find({
      order: { createdAt: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    await this.findOne(id); // Check if exists
    await this.productsRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.productsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async seedInitialProducts(): Promise<void> {
    const count = await this.productsRepository.count();
    if (count === 0) {
      const initialProducts = [
        {
          name: 'Smartwatch Pro X',
          description: 'All-day health tracking, built‑in GPS, and a crisp AMOLED display — designed for active lifestyles.',
          price: '$299',
          image: 'smartwatch.webp',
        },
        {
          name: 'Noise‑Cancelling Studio Headphones',
          description: 'Premium over‑ear comfort with Adaptive Noise Cancellation and 35 hours battery life.',
          price: '$199',
          image: 'headphones.webp',
        },
        {
          name: 'Pro Mechanical Wireless Keyboard',
          description: 'Compact, hot‑swappable switches, Bluetooth + USB‑C, and customizable backlight — built for speed and comfort.',
          price: '$129',
          image: 'keyboard.jpg',
        },
      ];

      for (const productData of initialProducts) {
        const product = this.productsRepository.create(productData);
        await this.productsRepository.save(product);
      }
    }
  }
}
