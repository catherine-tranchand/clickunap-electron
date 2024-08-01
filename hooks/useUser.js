"use client";

import { useContext } from 'react';
import { UserContext } from '@/providers/UserProvider';




// TODO: Create a `getUser` function
// example: export const getUser = async () => {}

export default function useUser() {
  return useContext(UserContext);
}


