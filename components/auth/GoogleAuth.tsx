import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleAuth() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn("google", {
        callbackUrl: `${process.env.NEXT_PUBLIC_URL}/`, // or wherever you want to redirect after login
        redirect: true
      });
    } catch (error) {
      console.error("Google sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (session && session.user) {
    return (
      <div className="flex flex-col items-center gap-4 p-4">
        <Image
          src={session.user.image || "/default-avatar.png"}
          alt="Profile"
          className="w-16 h-16 rounded-full"
        />
        <p className="font-medium">Welcome, {session.user.name}</p>
        <button
          onClick={handleSignOut}
          className="px-6 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="flex items-center justify-center w-full gap-2 px-6 py-3 text-gray-700 transition-colors bg-white border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <div className="w-5 h-5 border-t-2 border-b-2 border-gray-700 rounded-full animate-spin" />
      ) : (
        <FcGoogle className="w-5 h-5" />
      )}
      {isLoading ? "Signing in..." : "Continue with Google"}
    </button>
  );
}