import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  create(@Body() createDto: CreateQuoteDto) {
    return this.quotesService.createQuote(createDto);
  }

  @Get()
  findAll() {
    return this.quotesService.findAll();
  }
}
