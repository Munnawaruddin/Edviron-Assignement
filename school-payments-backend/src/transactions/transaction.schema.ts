import { Schema, Document } from 'mongoose';



const TransactionSchema = new Schema({

  collect_id: { type: String, required: true },
  
  school_tenant: { type: String, required: true },
  
  gateway: { type: String, required:!0 },
  
  order_amount: {type: Number, required: true},
  
  transaction_amount: { type: Number, required: true },
  
  status: { type: String, required: true },
  
  custom_order_id: { type: String, required: true },
  
  });
  
  export interface Transaction extends Document {
  
  collect_id: string;
  
  school_id: string;
  
  gateway: string;
  
  order_amount: number;
  
  transaction_amount: number;
  
  status: string;
  
  custom_order_id: string;
  
  }