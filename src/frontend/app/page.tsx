import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-blue-500 via-blue-100 to-white animate-gradientMove bg-fixed">
      {/* Main Content */}
      <div className="flex flex-col relative z-10">
        {/* Banner / Navbar */}
        <nav className="flex justify-between items-center bg-white/50 backdrop-blur-md p-4 shadow-md sticky top-0 z-50">
          <h1 className="text-2xl font-bold text-blue-700">StressScope</h1>
          <div className="flex gap-4">
           <Link href="/login" className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700">
            Log In
          </Link>
          <Link href="/signup" className="bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600">
           Sign Up
          </Link>
           </div>
        </nav>


        {/* Hero Section */}
        <section className="flex flex-col items-center max-w-4xl mx-auto px-6 py-20 bg-white/40 backdrop-blur-lg rounded-xl shadow-lg mt-10">
          <div className="text-center animate-fadeInLeft">
            <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-6">
              Compassionate care, <br /> exceptional results.
            </h1>
            <p className="text-gray-600 text-lg">
              Our team of experienced doctors and specialists work collaboratively to provide personalized, compassionate care for every patient.
            </p>
          </div>
      </section>


        {/* Stats Section */}
        <section className="bg-white/40 backdrop-blur-lg py-12 mt-10 rounded-xl mx-6 shadow-md">
          <div className="max-w-5xl mx-auto flex flex-wrap justify-around text-center">
            <div className="p-4">
              <h3 className="text-4xl font-bold text-blue-600">20+</h3>
              <p className="text-gray-600 mt-2">Years of Experience</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold text-blue-600">95%</h3>
              <p className="text-gray-600 mt-2">Patient Satisfaction</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold text-blue-600">5,000+</h3>
              <p className="text-gray-600 mt-2">Patients Treated</p>
            </div>
            <div className="p-4">
              <h3 className="text-4xl font-bold text-blue-600">10+</h3>
              <p className="text-gray-600 mt-2">Specialties</p>
            </div>
          </div>
        </section>

        {/* Spacer to allow scrolling */}
        <div className="h-96"></div>
      </div>
    </main>
  );
}
