import { Injectable } from '@nestjs/common';
import { Quote } from './interfaces/quote.interface';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class QuotesService {
  private quotes: Quote[] = [];

  calculateSavings(bill: number): number {
    // Mock logic
    const savings = +(bill * 0.3).toFixed(2);
    return savings;
  }

  createQuote(createDto: CreateQuoteDto): Quote {
    const id = uuidv4();

    const estimatedSavings = this.calculateSavings(
      createDto.averageMonthlyBill,
    );

    const quote: Quote = {
      id,
      name: createDto.name,
      email: createDto.email,
      address: createDto.address,
      phone: createDto.phone,
      averageMonthlyBill: createDto.averageMonthlyBill,
      estimatedSavings,
      createdAt: new Date().toISOString(),
    };

    this.quotes.unshift(quote);
    return quote;
  }

  findAll(): Quote[] {
    return this.quotes;
  }
}
