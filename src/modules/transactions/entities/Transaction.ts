const TRANSACTION_TYPES = {
  EXPENSE: 'expense',
  INCOME: 'income',
} as const;

type TransactionType =
  (typeof TRANSACTION_TYPES)[keyof typeof TRANSACTION_TYPES];

export { TRANSACTION_TYPES, TransactionType };
