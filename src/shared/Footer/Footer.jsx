import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import useNavLinks from "../../custom hooks/useNavLinks";
import useTheme from "../../custom hooks/useTheme";

const Footer = () => {
    const links = useNavLinks();
    const {theme} = useTheme();

    return (
        <footer className={`bg-[#0f172a] text-gray-300 pt-10 pb-6 ${theme === 'dark' && 'border-t border-gray-500'} transition-transform`}>
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* Brand Info */}
                <div>
                    <h2 className="text-2xl font-bold text-main mb-4">💪 FitLife Gym</h2>
                    <p className="text-sm leading-relaxed">
                        Transform your body, mind, and health with our expert trainers and
                        state-of-the-art gym facilities. Join our fitness community today!
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold text-main mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        {links.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className="hover:text-main transition duration-300"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social Links */}
                <div>
                    <h3 className="text-xl font-semibold text-main mb-4">Follow Us</h3>
                    <div className="flex gap-4 text-lg">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-main">
                            <FaFacebookF />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-main">
                            <FaInstagram />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-main">
                            <FaTwitter />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-main">
                            <FaYoutube />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm">
                <p>
                    © {new Date().getFullYear()} <span className="text-main font-semibold">FitLife Gym</span>. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
