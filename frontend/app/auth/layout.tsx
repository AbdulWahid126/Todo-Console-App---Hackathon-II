import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="bg-[#0a0e1a] border-b border-[rgba(255,255,255,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold">
              <Link href="/" className="text-white hover:text-gray-300">
                TodoApp
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Link href="/auth/signin" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Sign In
              </Link>
              <Link href="/auth/signup" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Sign Up
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {children}
      </main>
    </div>
  );
}