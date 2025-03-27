import { findUserByEmail, findUserById, verifyPassword } from "./db";
import type { User } from "./db";


export type AuthError = 'CredentialsSignin' | 'UserNotFound' | 'InvalidCredentials';


interface SignInParams {
    email: string;
    password: string;
  }

  
  export async function signIn({ email, password }: SignInParams): Promise<{ user: User; error: null } | { user: null; error: AuthError }> {
    try {
      const user = await findUserByEmail(email);
      if (!user) {
        return { user: null, error: 'UserNotFound' };
      }
  
      const isValid = await verifyPassword(user, password);
      if (!isValid) {
        return { user: null, error: 'InvalidCredentials' };
      }
  
      // Don't return the password in the user object
      const { password: _, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword as User,
        error: null
      };
    } catch (error) {
      console.error('Sign in error:', error);
      return { user: null, error: 'CredentialsSignin' };
    }
  }

  
  