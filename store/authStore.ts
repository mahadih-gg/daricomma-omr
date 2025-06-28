import {
  LoginEmailOtpRequest,
  LoginStudentRequest,
  SignupRequestEmailOtp,
  createOTP,
  getCurrentUser,
  loginStudent,
  loginWithEmailOtp,
  registerStudent,
  signupWithEmailOtp,
} from "@/api/auth";
import { UserRole } from "@/enums/auth.enum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { create } from "zustand";

// Define query keys
export const authQueryKeys = {
  currentUser: ["currentUser"],
  auth: ["auth"],
};

export const useCurrentUser = () => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("accessToken").then((token) => {
      setHasToken(!!token);
    });
  }, []);

  return useQuery({
    queryFn: getCurrentUser,
    queryKey: authQueryKeys.currentUser,
    enabled: hasToken,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      credentials,
      role,
    }: {
      credentials: LoginStudentRequest | LoginEmailOtpRequest;
      role: UserRole;
    }) => {
      // For dummy login, just return a mock response
      if (credentials.username === 'dummy@test.com' || credentials.username.includes('@')) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
          accessToken: 'dummy-access-token-123',
          profile: {
            _id: 'dummy-user-id',
            userId: 'dummy-user-123',
            username: credentials.username,
            role: UserRole.STUDENT,
            email: credentials.username,
            firstName: 'John',
            lastName: 'Doe',
            avatar: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            readingLevel: 1,
            xp: 0,
            total_xp_needed_for_reward: 100,
            wordMastery: 0,
            onboarded: true,
          } as User,
        };
      }

      // Original API calls for real authentication
      switch (role) {
        case UserRole.STUDENT:
          return loginStudent(credentials as LoginStudentRequest);
        case UserRole.PARENT:
          return loginWithEmailOtp(
            credentials as LoginEmailOtpRequest,
            "parent"
          );
        case UserRole.TEACHER:
          return loginWithEmailOtp(
            credentials as LoginEmailOtpRequest,
            "teacher"
          );
        default:
          return loginStudent(credentials as LoginStudentRequest);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.currentUser });
      AsyncStorage.setItem("accessToken", data.accessToken);
      // Use replace to clear the navigation stack
      router.replace("/(private)/(tabs)");
    },
  });
};

export const useRequestOTP = () => {
  return useMutation({
    mutationFn: ({
      email,
      type,
    }: {
      email: string;
      type: "ConfirmEmail" | "EmailLogin" | "EmailSignup"
    }) => createOTP(email, type),
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userData,
      role,
    }: {
      userData: any;
      role: UserRole;
    }) => {
      switch (role) {
        case UserRole.STUDENT:
          return registerStudent(userData);
        case UserRole.PARENT:
          return signupWithEmailOtp(
            {
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              otp: userData.otp,
            } as SignupRequestEmailOtp,
            "parent"
          );
        case UserRole.TEACHER:
          return signupWithEmailOtp(
            {
              firstName: userData.firstName,
              lastName: userData.lastName,
              email: userData.email,
              otp: userData.otp,
            } as SignupRequestEmailOtp,
            "teacher"
          );
        default:
          throw new Error("Invalid role for signup");
      }
    },
    onSuccess: (data) => {
      if (data.accessToken) {
        AsyncStorage.setItem("accessToken", data.accessToken);
      }
      queryClient.setQueryData(authQueryKeys.currentUser, data.profile);
      router.replace("/");
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return AsyncStorage.removeItem("accessToken");
    },
    onSuccess: () => {
      queryClient.clear();
      router.replace("/");
    },
  });
};

export interface AuthState {
  selectedRole: UserRole;
  setSelectedRole: (role: UserRole) => void;
  checkAuthStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  selectedRole: UserRole.STUDENT,

  setSelectedRole: (role) => set({ selectedRole: role }),

  checkAuthStatus: async () => {
    try {
      const isAccessToken = await AsyncStorage.getItem("accessToken");
      if (!isAccessToken) {
        router.replace("/");
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      router.replace("/");
    }
  },
}));

export const initializeAuth = () => {
  useAuthStore.getState().checkAuthStatus();
};

export const useAuth = () => {
  const { selectedRole, setSelectedRole, checkAuthStatus } = useAuthStore();
  const currentUserQuery = useCurrentUser();
  const loginMutation = useLogin();
  const otpMutation = useRequestOTP();
  const signupMutation = useSignup();
  const logoutMutation = useLogout();

  return {
    // User data and state
    currentUser: currentUserQuery.data,
    isLoadingUser: currentUserQuery.isLoading,
    isRefreshingUser: currentUserQuery.isFetching,
    refreshUser: currentUserQuery.refetch,

    // Role selection
    selectedRole,
    setSelectedRole,

    // Auth status
    isLoggedIn: !!currentUserQuery.data,
    checkAuthStatus,

    // Login
    login: (credentials: LoginStudentRequest | LoginEmailOtpRequest) =>
      loginMutation.mutate({ credentials, role: selectedRole }),
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    // OTP
    requestOTP: (
      email: string,
      type: "ConfirmEmail" | "EmailLogin" | "EmailSignup"
    ) => otpMutation.mutate({ email, type }),
    isRequestingOTP: otpMutation.isPending,
    otpRequestError: otpMutation.error,

    // Signup
    signup: (userData: any) =>
      signupMutation.mutate({ userData, role: selectedRole }),
    isSigningUp: signupMutation.isPending,
    signupError: signupMutation.error,

    // Logout
    logout: () => logoutMutation.mutate(),
    isLoggingOut: logoutMutation.isPending,
  };
};
