const BANK_ACCOUNT_TYPES = {
  CHECKING: 'checking',
  CASH: 'cash',
  INVESTMENT: 'investment',
} as const;

type BankAccountType =
  (typeof BANK_ACCOUNT_TYPES)[keyof typeof BANK_ACCOUNT_TYPES];

export { BANK_ACCOUNT_TYPES as BankAccountTypes, BankAccountType };
