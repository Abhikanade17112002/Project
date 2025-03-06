
import facebook  from "../../../assets/facebook.png" ;
import twitter  from "../../../assets/twitter.png" ;
import insta  from "../../../assets/insta.png" ;
import youtube from "../../../assets/youtube.webp" ;
const Footer = () => {
  return (
    <footer className="bg-[#0B0133] text-white py-8 md:text-sm text-[10px]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 space-y-6 md:space-y-0 w-full">
          <div className="text-center md:text-left w-full ">
            <div className="flex justify-center md:justify-start items-center space-x-2 md:text-3xl text-xl font-bold">
              <span>J</span>
              <span>O</span>
              <span>B</span>
              <span>P</span>
              <span>O</span>
              <span>R</span>
              <span>T</span>
              <span>A</span>
              <span>L</span>
            </div>
            <p className="mt-4">
              Start a business and design the life you want – all in one place.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">BUILD YOUR BUSINESS</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-purple-300">
                    Business ideas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-300">
                    Case studies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-300">
                    Design and branding
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-300">
                    Dropshipping
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-300">
                    Marketing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">STORIES</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-purple-300">
                    A day in my life
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-300">
                    My first 90 days
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-300">
                    Raise the bar
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-300">
                    Starter stories
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">YOUR LIFE</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-purple-300">
                    Mindset
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-300">
                    Money
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-300">
                    Productivity
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-300">
                    Wellbeing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">FREE BUSINESS TOOLS</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-purple-300">
                    Business Name Generator
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-300">
                    Slogan Generator
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-300">
                    Traffic Calculator
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-300">
                    Profit Margin Calculator
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6">
            <a href="#">
              <img src={insta} alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="#">
              <img src={youtube} alt="TikTok" className="w-6 h-6" />
            </a>
            <a href="#">
              <img src={facebook} alt="Facebook" className="w-6 h-6" />
            </a>
            <a href="#">
              <img src={twitter} alt="Twitter" className="w-6 h-6" />
            </a>
          </div>

          <div className="mt-4 md:mt-0">
            <button className="bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center">
              <span className="mr-2">🌐</span>
              <span>English</span>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center md:text-left">
          <p>
            &copy; 2015-2024 Oberlo |{" "}
            <a href="#" className="hover:text-purple-300">
              Legal
            </a>{" "}
            |{" "}
            <a href="#" className="hover:text-purple-300">
              Sitemap
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
