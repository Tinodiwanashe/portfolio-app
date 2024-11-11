import { Roles } from '@/app/types/globals';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

export const checkRole = async (role: Roles) => {
    const { sessionClaims } = await auth();
    return sessionClaims?.metadata.role === role
}

// Create a checkRole() helper that uses the auth() helper to access the user's session claims. 
// From the session claims, access the publicMetadata object to check the user's role. The checkRole() 
// helper should accept a role of type Roles, which you created in the Create a global TypeScript definition step. 
// It should return true if the user has that role or false if they do not.