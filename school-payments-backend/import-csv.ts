import mongoose from 'mongoose';
import fs from 'fs';
import csvParser from 'csv-parser';

// MongoDB connection string
const MONGO_URI = 'mongodb://localhost:27017/school_payments';

// Connect to MongoDB
async function connectToDatabase() {
  await mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
      process.exit(1);
    });
}

// Schema definition
const transactionSchema = new mongoose.Schema({
  collect_id: Number,
  school_id: Number,
  gateway: String,
  order_amount: Number,
  transaction_amount: Number,
  status: String,
  custom_order_id: String,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Import CSV data
async function importCSV(filePath: string) {
  const transactions: any[] = [];
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      transactions.push(row);
    })
    .on('end', async () => {
      console.log('CSV file successfully processed.');
      try {
        await Transaction.insertMany(transactions);
        console.log('Data imported successfully.');
      } catch (error) {
        console.error('Error importing data:', error);
      } finally {
        mongoose.connection.close();
      }
    });
}

// Main function
async function main() {
  await connectToDatabase();
  const filePath = './transactions.csv'; // Adjust the path if needed
  await importCSV(filePath);
}

main().catch((err) => console.error(err));
