'use client';

import { useUser } from '@auth0/nextjs-auth0';
import HeaderClient from "@/components/HeaderClient";

export default function Header() {
  const { user } = useUser();

  return <HeaderClient user={user || null} />;
}
