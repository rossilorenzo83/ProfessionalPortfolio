import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { SECTION_IDS, API_ENDPOINTS } from "@/lib/constants";
import { Project } from "@/types";
import { ExternalLink, GitPullRequest } from "lucide-react";

const Portfolio = () => {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: [API_ENDPOINTS.PROJECTS],
  });

  return (
    <section id={SECTION_IDS.PORTFOLIO} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Portfolio</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Showcasing my most significant projects and work
          </p>
        </motion.div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-16 bg-gray-200 rounded mb-4"></div>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3].map((tag) => (
                      <div key={tag} className="h-6 w-16 bg-blue-100 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">Failed to load projects</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project) => (
              <motion.div 
                key={project.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative h-48 bg-gray-200">
                  <img 
                    src={project.imageUrl} 
                    alt={`${project.title} project`} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback for image loading error
                      e.currentTarget.src = "/project-placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-primary bg-opacity-80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-3">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          className="p-2 bg-white rounded-full" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label={`Visit ${project.title} live site`}
                        >
                          <ExternalLink className="w-5 h-5 text-primary" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          className="p-2 bg-white rounded-full" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} GitPullRequest repository`}
                        >
                          <GitPullRequest className="w-5 h-5 text-primary" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <a 
            href="https://github.com/johndoe" 
            className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-all hover:border-primary hover:text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitPullRequest className="mr-2 h-5 w-5" />
            <span>View More Projects on GitPullRequest</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
