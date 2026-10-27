
// // import express from 'express';
// // import cors from 'cors';

// // const app = express();

// // app.use(cors());
// // app.use(express.json());

// // app.get('/api/health', (req, res) => {
// //   res.status(200).json({
// //     success: true,
// //     message: 'Transaction Ledger API is running',
// //   });
// // });

// // export default app;




// import express from 'express';
// import cors from 'cors';
// import accountRoutes from './routes/accountRoutes.js';

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get('/api/health', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'Transaction Ledger API is running',
//   });
// });

// app.use('/api/accounts', accountRoutes);

// export default app;




import express from 'express';
import cors from 'cors';
import accountRoutes from './routes/accountRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Transaction Ledger API is running',
  });
});

app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);

export default app;
