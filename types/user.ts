export interface User {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: string;
  email: string;
  status: string;
  created_at: string;
  sms_otp_created: string;
  is_registered: string;
}

export interface CreateUserData {
  first_name: string;
  last_name: string;
  phone_number: string;
  role: "passenger" | "driver" | "admin";
  type: "normal" | "premium";
  is_registered: boolean;
  sms_otp_code?: string; // Optional as we'll generate if not provided
  status?: string; // Optional as we'll set default
}

export interface UseUserReturn {
  drivers: User[];
  loading: boolean;
  error: string | null;
  isConnected: boolean;
  checkApiConnection: () => Promise<void>;
  fetchDrivers: () => Promise<void>;
  createUser: (userData: CreateUserData) => Promise<void>;
  checkPhoneExists: (phoneNumber: string) => Promise<boolean>;
}
