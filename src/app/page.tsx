import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-blue-500 via-blue-200 to-white bg-fixed">
      {/* Main Content */}
      <div className="flex flex-col relative z-10">
        {/* Banner / Navbar */}
        <nav className="flex justify-between items-center bg-white/80 backdrop-blur-md p-6 shadow-lg sticky top-0 z-50">
          <h1 className="text-4xl font-extrabold text-blue-700 font-serif tracking-wide">StressScope</h1>
          <div className="flex gap-6">
            <Link href="/login" className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md">
              Log In
            </Link>
            <Link href="/signup" className="bg-green-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-600 transition-all duration-300 shadow-md">
              Sign Up
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center max-w-4xl mx-auto px-8 py-32 bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl mt-10">
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-6 text-center font-serif tracking-wide">
            Track, Manage & Reflect on Your Stress Levels
          </h1>
          <p className="text-xl text-gray-700 mb-6 text-center max-w-3xl font-sans">
            StressScope helps you track your emotional well-being with a growing tree, representing your journey to a balanced life.
          </p>
          <Link href="/signup" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-2xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg">
            Get Started
          </Link>
        </section>

        {/* Features Section */}
        <section className="bg-white/60 backdrop-blur-lg py-16 mt-16 rounded-xl mx-6 shadow-md">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 font-serif">How StressScope Helps You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <i className="fas fa-heartbeat text-4xl text-blue-600"></i>
                </div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-4 font-sans">Track Your Stress</h3>
                <p className="text-gray-600 first-line:text-indent-0">
                  Monitor your stress in real-time and get valuable insights into your emotional well-being throughout the day.
                </p>
              </div>
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <i className="fas fa-tree text-4xl text-blue-600"></i>
                </div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-4 font-sans">Watch Your Tree Grow</h3>
                <p className="text-gray-600">
                  See your personal tree evolve as your stress levels improve. A thriving tree represents your path to a balanced, stress-free life.
                </p>
              </div>
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <i className="fas fa-book text-4xl text-blue-600"></i>
                </div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-4 font-sans">Reflect and Improve</h3>
                <p className="text-gray-600">
                  Use your diary to record your moods and thoughts. Reflect on your journey, track patterns, and strive for positive change.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Tree Demo */}
        <section className="bg-gradient-to-b from-blue-300 via-blue-100 to-white py-16 mt-16 rounded-xl mx-6 shadow-md">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 font-serif">See Your Tree in Action</h2>
            <p className="text-lg text-gray-600 mb-6 font-sans">
              Watch how your tree changes with each day of stress management! A healthy tree symbolizes your emotional growth and balance.
            </p>
            <div className="relative bg-white/50 backdrop-blur-lg rounded-lg shadow-md p-10">
              {/* Tree Animation Demo */}
              <div className="text-6xl animate-pulse">{/* Tree Emoji or Animation goes here */} 🌳</div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="bg-blue-600 py-12 mt-16 text-center text-white">
          <h2 className="text-4xl font-semibold mb-6 font-serif">Take the First Step Toward a Balanced Life</h2>
          <p className="text-xl mb-6 font-sans">
            Ready to take control of your emotional well-being? Sign up now and start your journey towards a stress-free and fulfilling life.
          </p>
          <Link href="/signup" className="bg-green-500 px-8 py-4 rounded-xl text-2xl font-semibold hover:bg-green-600 transition-all duration-300 shadow-lg">
            Sign Up Now
          </Link>
        </section>

        {/* Spacer to allow scrolling */}
        <div className="h-96"></div>
      </div>
    </main>
  );
}