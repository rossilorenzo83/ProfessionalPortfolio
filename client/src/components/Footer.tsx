import { Link } from "wouter";
import { Linkedin, GitPullRequest, Twitter } from "lucide-react";
import { SECTION_IDS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/lib/constants";
import { ContactInfo } from "@/types";

const Footer = () => {
  const { data: contactInfo } = useQuery<ContactInfo>({
    queryKey: [API_ENDPOINTS.CONTACT],
  });

  const navItems = [
    { label: "About", href: `#${SECTION_IDS.ABOUT}` },
    { label: "Skills", href: `#${SECTION_IDS.SKILLS}` },
    { label: "Portfolio", href: `#${SECTION_IDS.PORTFOLIO}` },
    { label: "GitPullRequest", href: `#${SECTION_IDS.GITHUB}` },
    { label: "Contact", href: `#${SECTION_IDS.CONTACT}` },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <a href={`#${SECTION_IDS.HERO}`} className="text-2xl font-bold text-white flex items-center">
              <span>John Doe</span>
            </a>
            <p className="mt-2 text-gray-400 max-w-md">
              Full-stack developer specializing in creating responsive, user-friendly applications that solve real-world problems.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {navItems.map((item) => (
              <a 
                key={item.label}
                href={item.href} 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(item.href);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © {currentYear} John Doe. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            {contactInfo?.social && (
              <>
                <a 
                  href={contactInfo.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href={contactInfo.social.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="GitPullRequest Profile"
                >
                  <GitPullRequest className="w-5 h-5" />
                </a>
                <a 
                  href={contactInfo.social.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
