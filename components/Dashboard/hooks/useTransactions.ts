import { useState, useCallback } from "react";
import { Transaction } from "../types/wallet";

export const useTransactions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTransactions = useCallback(
    async (phoneNumber: string): Promise<Transaction[]> => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://aws.pasundo.com/api/wallet/${phoneNumber}/transactions`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch transactions: ${response.statusText}`
          );
        }

        // Handle direct array response
        const data = await response.json();

        // Transform the data to match our Transaction interface
        const transactions = Array.isArray(data)
          ? data.map((transaction) => ({
              id: transaction.id,
              amount: transaction.amount,
              operation_type: transaction.operation_type,
              balance_after: transaction.balance_after,
              timestamp: transaction.created_at,
              type: "gcash", // default value since it's not in the response
              user_id: transaction.wallet_id.toString(),
            }))
          : [];

        return transactions;
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    error,
    fetchTransactions,
  };
};
