import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { SECTION_IDS, API_ENDPOINTS } from "@/lib/constants";
import { Profile } from "@/types";

const Hero = () => {
  const { data: profile, isLoading, error } = useQuery<Profile>({
    queryKey: [API_ENDPOINTS.PROFILE],
  });

  return (
    <section id={SECTION_IDS.HERO} className="min-h-screen pt-24 flex items-center bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0 md:pr-10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isLoading ? (
              <div className="animate-pulse">
                <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-blue-200 rounded w-1/2 mb-6"></div>
                <div className="h-24 bg-gray-200 rounded mb-8"></div>
                <div className="flex flex-wrap gap-4">
                  <div className="h-12 w-32 bg-blue-200 rounded-lg"></div>
                  <div className="h-12 w-32 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            ) : error ? (
              <div className="text-red-500">Failed to load profile information</div>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  {profile?.name || "John Doe"}
                </h1>
                <h2 className="text-2xl md:text-3xl text-primary font-semibold mb-6">
                  {profile?.title || "Full-Stack Developer"}
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {profile?.summary || "Passionate developer with experience building scalable web applications and solving complex problems."}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href={`#${SECTION_IDS.CONTACT}`} 
                    className="px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(SECTION_IDS.CONTACT);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Get In Touch
                  </a>
                  <a 
                    href={API_ENDPOINTS.CV} 
                    className="px-6 py-3 border border-primary text-primary font-medium rounded-lg hover:bg-blue-50 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download CV
                  </a>
                </div>
              </>
            )}
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-primary rounded-full opacity-10 animate-pulse"></div>
              {isLoading ? (
                <div className="rounded-full bg-gray-200 w-full h-full"></div>
              ) : (
                <img 
                  src={profile?.avatar || "/avatar-placeholder.svg"} 
                  alt={`${profile?.name || "John Doe"} profile picture`} 
                  className="rounded-full object-cover w-full h-full border-4 border-white shadow-lg"
                  onError={(e) => {
                    // Fallback for image loading error
                    e.currentTarget.src = "/avatar-placeholder.svg";
                  }}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
