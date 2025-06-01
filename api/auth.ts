import { UserRole } from "@/enums/auth.enum";
import { ApiResponse } from "@/types";
import api from "./api";

// Define types for the auth API
export interface LoginStudentRequest {
  username: string;
  password: string;
}

export interface LoginEmailOtpRequest {
  email: string;
  otp: string;
}

export interface SignupRequestStudent {
  firstName: string;
  lastName: string;
  password: string;
}

export interface SignupRequestEmailOtp {
  firstName: string;
  lastName: string;
  email: string;
  otp: string;
}

export interface MainUser {
  userId: string;
  username: string;
  role: UserRole;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
  readingLevel?: number;
  xp?: number;
  total_xp_needed_for_reward?: number;
}

export interface User {
  _id: string;
  userId: string;
  username: string;
  role: UserRole;
  email?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
  readingLevel?: number;
  mainUser?: MainUser;
  xp?: number;
  total_xp_needed_for_reward?: number;
  wordMastery?: number;
  password?: string;
  onboarded?: boolean;
  parentId?: string;
}

export interface LoginResponse {
  accessToken: string;
  profile: User;
  success?: boolean;
}

// User Update Interface
export interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  readingLevel?: number;
  email?: string;
}

// Student
export async function registerStudent(
  userData: SignupRequestStudent
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/auth/student/signup",
    userData
  );
  return response.data;
}

export async function loginStudent(
  credentials: LoginStudentRequest
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/auth/student/login",
    credentials
  );
  return response.data;
}

// Common functions for Parent and Teacher
export async function createOTP(
  email: string,
  type: "EmailLogin" | "EmailSignup" | "ConfirmEmail"
): Promise<{ success: boolean }> {
  try {
    const response = await api.post<ApiResponse<{ success: boolean }>>(
      "/otp/create",
      { email, type }
    );
    return response.data;
  } catch (error) {
    console.error("OTP request error:", error);
    throw error;
  }
}

export async function verifyOTP(
  email: string,
  otp: string
): Promise<{ success: boolean }> {
  try {
    const response = await api.post<ApiResponse<{ success: boolean }>>(
      "/otp/verify",
      { email, otp }
    );
    return response.data;
  } catch (error) {
    console.error("OTP verification error:", error);
    throw error;
  }
}

// Common signup function for Parent and Teacher
export async function signupWithEmailOtp(
  userData: SignupRequestEmailOtp,
  role: "parent" | "teacher"
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    `/auth/${role}/signup`,
    userData
  );
  return response.data;
}

// Common login function for Parent and Teacher
export async function loginWithEmailOtp(
  credentials: LoginEmailOtpRequest,
  role: "parent" | "teacher"
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    `/auth/${role}/login`,
    credentials
  );
  return response.data;
}

// Aliases for backward compatibility
export const parentSignup = (userData: SignupRequestEmailOtp) =>
  signupWithEmailOtp(userData, "parent");

export const loginParent = (credentials: LoginEmailOtpRequest) =>
  loginWithEmailOtp(credentials, "parent");

export const loginTeacher = (credentials: LoginEmailOtpRequest) =>
  loginWithEmailOtp(credentials, "teacher");

// Refresh User Data
export async function getCurrentUser(): Promise<User> {
  const response = await api.get<ApiResponse<User>>("/user/profile");
  return response.data.data;
}

// Update User Profile
export async function updateUserProfile(
  userData: UserUpdateRequest
): Promise<User> {
  const response = await api.patch<ApiResponse<User>>("/user/update", userData);
  return response.data.data;
}
