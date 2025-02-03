import { useState, useCallback } from "react";
import {
  UserData,
  WalletData,
  SearchResults,
  WalletOperationResponse,
} from "../types/wallet";

export const useWallet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const formatPhoneNumber = useCallback(
    (phone: string | undefined | null): string => {
      if (!phone) return "";
      try {
        const cleaned = phone.toString().replace(/\D/g, "");
        return cleaned.startsWith("09") && cleaned.length === 11
          ? cleaned
          : cleaned;
      } catch {
        return "";
      }
    },
    []
  );

  const searchWallet = useCallback(
    async (phoneNumber: string): Promise<SearchResults | null> => {
      setIsLoading(true);
      setError("");

      try {
        const formattedPhone = formatPhoneNumber(phoneNumber);

        // Fetch user data
        const usersResponse = await fetch("https://aws.pasundo.com/api/users/");
        const usersData: UserData[] = await usersResponse.json();

        const matchingUser = usersData.find(
          (user) => formatPhoneNumber(user.phone_number) === formattedPhone
        );

        if (!matchingUser)
          throw new Error("No user found with this phone number");

        // Fetch wallet data
        const walletResponse = await fetch(
          "https://aws.pasundo.com/api/wallet/"
        );
        const walletData: WalletData[] = await walletResponse.json();

        const matchingWallet = walletData.find(
          (wallet) => wallet.user_id === matchingUser.id
        );

        if (!matchingWallet) throw new Error("No wallet found for this user");

        return { wallet: matchingWallet, user: matchingUser };
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [formatPhoneNumber]
  );

  const modifyWalletBalance = async (
    phoneNumber: string,
    operation: "add" | "deduct",
    amount: number,
    type: string = "gcash"
  ): Promise<WalletOperationResponse | false> => {
    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      const searchResult = await searchWallet(phoneNumber);
      if (!searchResult?.wallet?.user_id) {
        throw new Error("Could not find wallet");
      }

      // Validate inputs
      if (!formattedPhone) throw new Error("Invalid phone number");
      if (!["add", "deduct"].includes(operation))
        throw new Error("Invalid operation type");

      const numericAmount = parseInt(amount.toString(), 10);
      if (isNaN(numericAmount) || numericAmount <= 0) {
        throw new Error("Amount must be greater than 0");
      }

      const payload = {
        user_id: String(searchResult.wallet.user_id),
        amount: numericAmount,
        operation_type: operation,
        type: type,
      };

      const response = await fetch(
        `https://aws.pasundo.com/api/wallet/${formattedPhone}/operation`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.detail ||
          (Array.isArray(data)
            ? data.map((err) => err.msg).join(", ")
            : typeof data === "object"
            ? JSON.stringify(data)
            : "Unknown error");
        throw new Error(errorMessage);
      }

      return data as WalletOperationResponse;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to modify wallet"
      );
      return false;
    }
  };

  return {
    isLoading,
    error,
    searchWallet,
    formatPhoneNumber,
    modifyWalletBalance,
  };
};
