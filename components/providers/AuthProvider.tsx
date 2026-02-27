"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);

      // Protect admin routes
      if (!user && pathname?.startsWith("/admin") && pathname !== "/admin/login") {
        router.push("/admin/login");
      }

      // Redirect away from login if already authenticated
      if (user && pathname === "/admin/login") {
        router.push("/admin");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading && pathname?.startsWith("/admin") ? (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground cursor-none">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-sans tracking-widest uppercase text-foreground/50">Verifying Access...</span>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);