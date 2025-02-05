export interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
}

export interface WalletData {
  user_id: string;
  amount: number;
  phone_number: string;
}

export interface SearchResults {
  wallet: WalletData;
  user: UserData;
}

export interface WalletOperationResponse {
  message: string;
  phone_number: string;
  new_balance: number;
  amount_modified: number;
  operation_type: "add" | "deduct";
  timestamp: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  operation_type: "add" | "deduct";
  type: string;
  timestamp: string;
  balance_after: number;
}

export interface TransactionResponse {
  transactions: Transaction[];
  total_count: number;
}
