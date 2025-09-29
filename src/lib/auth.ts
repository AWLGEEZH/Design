// Authentication configuration for family photo sharing
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { User, LoginCredentials } from '@/types/auth';

// Mock user database (In production, this would be a real database)
const mockUsers: User[] = [
  {
    id: '1',
    email: 'parent@family.com',
    name: 'Parent User',
    role: 'parent',
    isInvited: true,
    createdAt: new Date(),
    lastLoginAt: new Date(),
  }
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // In production, this would query your database
        const user = mockUsers.find(u => u.email === credentials.email);
        
        if (!user) {
          return null;
        }

        // In production, compare with hashed password
        // const isValidPassword = await bcrypt.compare(credentials.password, user.hashedPassword);
        
        // For demo purposes, accept any password
        const isValidPassword = true;
        
        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'family-photos-secret-key',
};

// Utility functions for authentication
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateInviteCode = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
