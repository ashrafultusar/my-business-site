"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "Offers", href: "/offers" },
        { label: "FAQ", href: "/faq" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-[#D11A6E] text-white pt-10 pb-6 px-4 md:px-8 border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
        
        {/* Brand Section */}
        <div className="col-span-2 flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-wide">
            <div className="border-2 border-white rounded-full w-6 h-6 flex items-center justify-center font-extrabold text-xs">
              M
            </div>
            <span>My Shop</span>
          </Link>
          <p className="text-xs text-white/80 max-w-xs">
            Your ultimate lifestyle and shopping destination.
          </p>
          {/* Socials */}
          <div className="flex items-center gap-4 mt-1">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity"><FaFacebook className="w-4 h-4" /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity"><BsTwitter className="w-4 h-4" /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity"><BsInstagram className="w-4 h-4" /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity"><BsYoutube className="w-4 h-4" /></a>
          </div>
        </div>

        {/* Links Sections */}
        {sections.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-white/90">{section.title}</h3>
            <ul className="flex flex-col gap-1.5">
              {section.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <Link href={link.href} className="text-xs text-white/70 hover:text-white transition-colors block w-fit">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <hr className="border-white/10 my-4" />

      {/* Bottom Info */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/60">
        <p>&copy; {currentYear} Govaly Inc.</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /><span>Dhaka, Bangladesh</span></div>
          <div className="flex items-center gap-1"><Phone className="w-3 h-3" /><span>+880 1234-567890</span></div>
          <div className="flex items-center gap-1"><Mail className="w-3 h-3" /><span>support@govaly.com</span></div>
        </div>
      </div>
    </footer>
  );
}