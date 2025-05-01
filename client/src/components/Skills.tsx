import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { SECTION_IDS, API_ENDPOINTS } from "@/lib/constants";
import { Skill, Tool, SoftSkill } from "@/types";
import { Code, Package, Users, CheckCircle } from "lucide-react";

const Skills = () => {
  const { data: skills, isLoading: loadingSkills } = useQuery<Skill[]>({
    queryKey: [API_ENDPOINTS.SKILLS, "technical"],
  });

  const { data: tools, isLoading: loadingTools } = useQuery<Tool[]>({
    queryKey: [API_ENDPOINTS.SKILLS, "tools"],
  });

  const { data: softSkills, isLoading: loadingSoftSkills } = useQuery<SoftSkill[]>({
    queryKey: [API_ENDPOINTS.SKILLS, "soft"],
  });

  return (
    <section id={SECTION_IDS.SKILLS} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            My technical toolkit and areas of expertise
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Technical Skills Card */}
          <motion.div 
            className="bg-white rounded-xl shadow-md p-8 transition-transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <Code className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-6">Technical Skills</h3>
            
            {loadingSkills ? (
              <div className="space-y-6 animate-pulse">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-4 bg-gray-200 rounded w-10"></div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {skills?.map((skill, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                      <span className="text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="bg-primary h-full rounded-full" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
          
          {/* Frameworks & Tools Card */}
          <motion.div 
            className="bg-white rounded-xl shadow-md p-8 transition-transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <Package className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-6">Frameworks & Tools</h3>
            
            {loadingTools ? (
              <div className="grid grid-cols-2 gap-4 animate-pulse">
                {Array(10).fill(0).map((_, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-accent mr-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {tools?.map((tool, index) => (
                  <div key={index} className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-accent mr-2"></div>
                    <span className="text-gray-700">{tool.name}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
          
          {/* Soft Skills Card */}
          <motion.div 
            className="bg-white rounded-xl shadow-md p-8 transition-transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold mb-6">Soft Skills</h3>
            
            {loadingSoftSkills ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="h-5 w-5 rounded-full bg-gray-200 mr-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {softSkills?.map((skill, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-accent mr-3" />
                    <span className="text-gray-700">{skill.name}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
