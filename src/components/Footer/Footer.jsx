export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-900 to-black text-gray-300 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">TravelLite</h2>
          <p className="text-sm leading-relaxed">
            Discover the world with comfort and affordable travel packages.  
            Let's create memories across India and beyond.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1 .9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12"/>
              </svg>
            </a>
            <a href="#" className="hover:text-white transition">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.2c-5.5 0-10 4.5-10 10 0 4.4 3.6 9.7 8.3 9.7h.1c4.7 0 9.3-5.3 9.3-9.7 0-5.5-4.5-10-10-10zm3.6 6.5c-.2 2.2-1.3 4.7-3.2 6.3-1.2 1-2.6 1.6-4.1 1.6-.2 0-.5 0-.7-.1 1.5 1 3.3 1.5 5 1.5 4.4 0 8-3.6 8-8 0-.4 0-.9-.1-1.3-.2.1-.3.2-.4.2-.8.5-1.6.8-2.4.8-.8 0-1.6-.3-2.1-1z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-white transition">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.8 8s-.2-1.4-.8-2c-.7-.8-1.5-.8-1.8-.9-2.5-.2-6.2-.2-6.2-.2h-.1s-3.7 0-6.2.2c-.3 0-1.1 0-1.8.9-.6.6-.8 2-.8 2S4 9.6 4 11.3v1.3c0 1.7.2 3.3.2 3.3s.2 1.4.8 2c.7.8 1.7.8 2.2.9 1.6.2 6 .2 6 .2s3.7 0 6.2-.2c.3 0 1.1 0 1.8-.9.6-.6.8-2 .8-2s.2-1.7.2-3.3v-1.3c0-1.7-.2-3.3-.2-3.3zM10 14.7V9.3l5.2 2.7-5.2 2.7z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Discover */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Discover</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/About" className="hover:text-white transition">About</a></li>
            <li><a href="/Package" className="hover:text-white transition">Packages</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#Gallary" className="hover:text-white transition">Gallery</a></li>
            <li><a href="/Login" className="hover:text-white transition">Login</a></li>
            <li><a href="/SignIn" className="hover:text-white transition">Register</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
          <p className="text-sm">📍 Address: ABC Building, India</p>
          <p className="text-sm">📧 Email: travel@travellite.com</p>
          <p className="text-sm">📞 Phone: 9840473920</p>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-gray-500 text-sm mt-12">
        © {new Date().getFullYear()} TravelLite — All Rights Reserved.
      </div>
    </footer>
  );
}
