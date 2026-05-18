"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";


interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections: FooterSection[] = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Blog", href: "/blog" },
        { label: "Press", href: "/press" },
      ],
    },
    {
      title: "Help & Support",
      links: [
        { label: "Customer Service", href: "/support" },
        { label: "Terms & Conditions", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "Download App", href: "/download" },
        { label: "Special Offers", href: "/offers" },
        { label: "Store Locator", href: "/stores" },
        { label: "Gift Cards", href: "/gift-cards" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-[#D11A6E] text-white pt-12 pb-6 px-4 md:px-8 border-t border-white/10 select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
        
        {/* Brand Information Section */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-wide text-white">
            <div className="border-2 border-white rounded-full w-7 h-7 flex items-center justify-center font-extrabold text-sm">
              M
            </div>
            <span>My Shop</span>
          </Link>
          <p className="text-sm text-white/80 max-w-sm leading-relaxed">
            Your ultimate lifestyle and shopping destination. Empowering your everyday choices with quality products and seamless experience.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors" aria-label="Facebook">
              <FaFacebook className="w-5 h-5 text-white" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors" aria-label="Twitter">
              <BsTwitter className="w-5 h-5 text-white" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors" aria-label="Instagram">
              <BsInstagram className="w-5 h-5 text-white" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors" aria-label="Youtube">
              <BsYoutube className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        {/* Dynamic Navigation Sections */}
        {footerSections.map((section, index) => (
          <div key={index} className="flex flex-col gap-3">
            <h3 className="font-semibold text-base tracking-wider uppercase text-white/90">
              {section.title}
            </h3>
            <ul className="flex flex-col gap-2">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-white/70 hover:text-white transition-colors block w-fit"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Divider */}
      <hr className="border-white/20 my-6" />

      {/* Bottom Section: Copyright & Contact Info Summary */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
        <p>&copy; {currentYear} Govaly Inc. All rights reserved.</p>
        
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <div className="flex items-center gap-1">
            <MapPin  className="w-3.5 h-3.5 text-white" />
            <span>Dhaka, Bangladesh</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-white" />
            <span>+880 1234-567890</span>
          </div>
          <div className="flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-white" />
            <span>support@govaly.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}