import { useState, useEffect, useCallback } from "react";
import { User, UseUserReturn, CreateUserData } from "../types/user";

const API_URL = "https://aws.pasundo.com/api/users/";

export const useUser = (): UseUserReturn => {
  const [drivers, setDrivers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const fetchDrivers = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      const data: User[] = await response.json();
      setDrivers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      setError("Failed to fetch driver data.");
      setLoading(false);
    }
  }, []);

  const checkApiConnection = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        setIsConnected(true);
        fetchDrivers();
      } else {
        setError(`API Error: ${response.status} ${response.statusText}`);
        setIsConnected(false);
      }
    } catch (error) {
      console.error("API Connection Error:", error);
      setError("Failed to connect to API. Please check your connection.");
      setIsConnected(false);
      setLoading(false);
    }
  }, [fetchDrivers]);

  const createUser = async (userData: CreateUserData) => {
    try {
      const dataToSend = {
        ...userData,
        sms_otp_code:
          userData.sms_otp_code ||
          Math.floor(1000 + Math.random() * 9000).toString(),
        is_registered: true,
        status: "active",
      };

      const response = await fetch(`${API_URL}create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.detail ||
            `Failed to create user: ${response.status}`
        );
      }

      await fetchDrivers();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const checkPhoneExists = async (phoneNumber: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}${phoneNumber}`);

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      return !!(
        data &&
        typeof data === "object" &&
        Object.keys(data).length > 0
      );
    } catch {
      return false;
    }
  };

  useEffect(() => {
    checkApiConnection();
  }, [checkApiConnection]);

  return {
    drivers,
    loading,
    error,
    isConnected,
    checkApiConnection,
    fetchDrivers,
    createUser,
    checkPhoneExists,
  };
};
