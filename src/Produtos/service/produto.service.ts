import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Produtos } from '../entities/produto.entity';
import { CategoriaService } from '../../Categoria/service/categoria.service';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produtos)
    private readonly produtosRepository: Repository<Produtos>,
    private readonly categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Produtos[]> {
    return this.produtosRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Produtos> {
    const postagem = await this.produtosRepository.findOne({
      where: { id },
      relations: {
        categoria: true,
      },
    });
    if (!postagem) throw new NotFoundException('Produto não encontrado');
    return postagem;
  }

  async findByName(nome: string): Promise<Produtos[]> {
    return this.produtosRepository.find({
      where: {
        nome: ILike(`%${nome}%`),
      },
      relations: {
        categoria: true,
      },
    });
  }

  async create(produtos: Produtos): Promise<Produtos> {
    await this.categoriaService.findById(produtos.categoria.id);
    return await this.produtosRepository.save(produtos);
  }

  async update(produtos: Produtos): Promise<Produtos> {
    await this.findById(produtos.id);
    await this.categoriaService.findById(produtos.categoria.id);
    return await this.produtosRepository.save(produtos);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return this.produtosRepository.delete(id);
  }
}