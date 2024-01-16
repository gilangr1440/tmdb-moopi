import "/node_modules/flag-icons/css/flag-icons.min.css";

const Footer = () => {
  return (
    <div>
      <div className="font-main w-full h-[450px] bg-slate-700">
        <div className="w-3/4 mx-auto text-center py-8">
          <h1 className="text-3xl text-slate-50">
            Any Question? <span className="text-yellow-300">1-826-123-4567</span>
          </h1>
          <p className="text-slate-50 text-base mb-8">Availble on 7 AM - 3 PM</p>
          <div className="flex flex-wrap gap-32 text-left text-white py-8 border-solid border-t border-t-slate-400">
            <h1 className="text-4xl font-bold font-logo">
              <i className="bx bxs-camera-movie"></i> MOOPI
            </h1>
            <ul className="footer-link-list">
              <li className="!mb-5 text-lg font-bold">GET IN TOUCH</li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  About US
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Feedback
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Contact Us
                </a>
              </li>
            </ul>
            <ul className="footer-link-list">
              <li className="!mb-5 text-lg font-bold">SOMETHING</li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  License
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Term of Condition
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Gift
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  How to Play
                </a>
              </li>
            </ul>
            <ul className="footer-link-list">
              <li className="!mb-5 font-bold">GET THE APP</li>
              <li>
                <img src="..\assets\app-store.png" width={130} alt="app-store" />
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-3 gap-4 text-white">
            <ul className="flex gap-5">
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Cookies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Advertisement
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Legal
                </a>
              </li>
            </ul>
            <h1>&copy; 2023 MOOPI. All right Reserved</h1>
            <ul className="flex gap-2 justify-end">
              <li>
                <span className="fi fi-us"></span>
              </li>
              <li>English</li>
              <li>&middot;</li>
              <li>
                <select className="bg-transparent" name="lang" id="lang">
                  <option value="us">US</option>
                  <option value="id">ID</option>
                  <option value="uk">UK</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
