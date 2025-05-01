import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { SECTION_IDS, API_ENDPOINTS } from "@/lib/constants";
import { Profile } from "@/types";
import { Briefcase, Award, MapPin, BookOpen, Linkedin, ExternalLink } from "lucide-react";

const About = () => {
  const { data: profile, isLoading, error } = useQuery<Profile>({
    queryKey: [API_ENDPOINTS.PROFILE],
  });

  const profileDetails = [
    { label: "Current Role", value: profile?.currentRole, icon: <Briefcase className="w-5 h-5 text-primary" /> },
    { label: "Experience", value: profile?.experience, icon: <Award className="w-5 h-5 text-primary" /> },
    { label: "Location", value: profile?.location, icon: <MapPin className="w-5 h-5 text-primary" /> },
    { label: "Education", value: profile?.education, icon: <BookOpen className="w-5 h-5 text-primary" /> },
  ];

  return (
    <section id={SECTION_IDS.ABOUT} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            I combine creativity and technical expertise to build impactful digital solutions.
          </p>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row">
            {/* LinkedIn Integration Preview */}
            <div className="md:w-1/3 bg-gray-50 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-6">
                <Linkedin className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">LinkedIn Profile</h3>
              <p className="text-gray-500 text-center mb-6">Integrated with the LinkedIn API to show real-time profile data</p>
              <a 
                href="https://linkedin.com/in/johndoe" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:text-blue-700 flex items-center gap-2"
              >
                <span>View on LinkedIn</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            
            {/* Profile Information */}
            <div className="md:w-2/3 p-8">
              {isLoading ? (
                <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-md mr-4 w-9 h-9"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                        <div className="h-6 bg-gray-300 rounded w-32"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-red-500">Failed to load profile information</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profileDetails.map((detail) => (
                    <div key={detail.label} className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-md mr-4">
                        {detail.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">{detail.label}</h4>
                        <p className="font-medium">{detail.value || "Not available"}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="col-span-1 md:col-span-2 mt-6">
                    <a 
                      href={API_ENDPOINTS.CV} 
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <span>Download Full CV</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
