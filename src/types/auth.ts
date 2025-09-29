// Authentication and User Types for Family Photo Sharing

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'parent' | 'grandparent' | 'family';
  avatar?: string;
  isInvited: boolean;
  inviteCode?: string;
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface FamilyMember {
  id: string;
  userId: string;
  familyId: string;
  role: 'parent' | 'grandparent' | 'family';
  permissions: Permission[];
  invitedBy: string;
  joinedAt: Date;
}

export interface Family {
  id: string;
  name: string;
  inviteCode: string;
  createdBy: string;
  createdAt: Date;
  members: FamilyMember[];
}

export interface Permission {
  canUpload: boolean;
  canDelete: boolean;
  canInvite: boolean;
  canManageFamily: boolean;
}

export interface AuthSession {
  user: User;
  family: Family;
  permissions: Permission;
  expiresAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  inviteCode?: string;
}

export interface InviteData {
  email: string;
  name: string;
  role: 'parent' | 'grandparent' | 'family';
}

// Default permissions by role
export const DEFAULT_PERMISSIONS: Record<string, Permission> = {
  parent: {
    canUpload: true,
    canDelete: true,
    canInvite: true,
    canManageFamily: true,
  },
  grandparent: {
    canUpload: true,
    canDelete: false,
    canInvite: false,
    canManageFamily: false,
  },
  family: {
    canUpload: true,
    canDelete: false,
    canInvite: false,
    canManageFamily: false,
  },
}
