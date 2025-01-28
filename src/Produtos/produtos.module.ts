import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produtos } from './entities/produto.entity';
import { CategoriaModule } from '../Categoria/categoria.module';
import { ProdutosController } from './controllers/produto.controller';
import { ProdutosService } from './service/produto.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produtos]), CategoriaModule],
  controllers: [ProdutosController],
  providers: [ProdutosService],
})
export class ProdutoModule {}