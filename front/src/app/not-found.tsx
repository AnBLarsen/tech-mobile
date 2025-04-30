import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="bg-[#e8ecfd5d] flex flex-col items-center justify-center h-dvh text-center px-4">
      <div className="mb-6">
        <Image
          src="/404.png" 
          alt="404 Illustration"
          width={300}
          height={300}
        />
      </div>

      <div>
        <h2 className="md:text-8xl sm:text-6xl text-5xl font-extrabold text-blue-600">404</h2>
        <h2 className="text-2xl font-bold text-gray-700 mt-4">Page Not Found...</h2>
        
        <Link
          href="/"
          className="inline-block mt-5 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
