import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async getAllTransactions() {
    return this.transactionsService.fetchAllTransactions();
  }

  @Get('by-school')
  async getTransactionsBySchool(@Query('school_id') school_id: string) {
    return this.transactionsService.fetchTransactionsBySchool(school_id);
  }

  @Get('check-status')
  async checkStatus(@Query('custom_order_id') custom_order_id: string) {
    return this.transactionsService.checkTransactionStatus(custom_order_id);
  }

  @Post('webhook')
  async webhookUpdate(@Body() payload: any) {
    const { order_id, status } = payload.order_info;
    return this.transactionsService.updateTransactionStatus(order_id, status);
  }

  @Post('manual-update')
  async manualUpdate(
    @Body('custom_order_id') custom_order_id: string,
    @Body('status') status: string,
  ) {
    return this.transactionsService.manualStatusUpdate(custom_order_id, status);
  }
}
