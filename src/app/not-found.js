import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full px-2">
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <img
          src="/error.svg"
          alt="Error"
          className="mb-4 w-80 h-50"
        />
        <Link href="/" className="mt-4 text-red-400 underline hover:text-red-700">
          Click here to Home page
        </Link>
      </div>
    </main>
  );
}
