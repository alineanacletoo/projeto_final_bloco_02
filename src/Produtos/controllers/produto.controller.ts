import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
  } from '@nestjs/common';
import { ProdutosService } from '../service/produto.service';
import { Produtos } from '../entities/produto.entity';
 
  @Controller('/produtos')
  export class ProdutosController {
    constructor(private readonly produtosService: ProdutosService) {}
  
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produtos[]> {
      return this.produtosService.findAll();
    }
  
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Produtos> {
      return this.produtosService.findById(id);
    }
  
    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByName(@Param('nome') nome: string): Promise<Produtos[]> {
      return this.produtosService.findByName(nome);
    }
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() medicamentos: Produtos): Promise<Produtos> {
      return this.produtosService.create(medicamentos);
    }
  
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() medicamentos: Produtos): Promise<Produtos> {
      return this.produtosService.update(medicamentos);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
      return this.produtosService.delete(id);
    }
  }