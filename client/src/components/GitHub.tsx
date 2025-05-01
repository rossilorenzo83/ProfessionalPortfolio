import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { SECTION_IDS, API_ENDPOINTS } from "@/lib/constants";
import { GitHubStats } from "@/types";
import { GitPullRequest as GitHubIcon, Star, GitBranch, ExternalLink } from "lucide-react";

const GitPullRequest = () => {
  const { data: githubStats, isLoading, error } = useQuery<GitHubStats>({
    queryKey: [API_ENDPOINTS.GITHUB],
  });

  // Helper function to generate the contribution grid
  const generateContributionGrid = () => {
    return (
      <div className="grid grid-cols-52 gap-1">
        {Array(52).fill(0).map((_, weekIndex) => (
          <div key={weekIndex} className="grid grid-rows-7 gap-1">
            {Array(7).fill(0).map((_, dayIndex) => {
              // Generate a random opacity value between 0 and 1 for demonstration purposes
              const opacity = Math.random();
              const intensity = opacity > 0.7 ? 'bg-green-500' : 
                              opacity > 0.4 ? 'bg-green-400' : 
                              opacity > 0.1 ? 'bg-green-300' : 
                              'bg-green-100';
              
              return (
                <div 
                  key={dayIndex} 
                  className={`w-3 h-3 rounded-sm ${intensity}`}
                  style={{ opacity: opacity > 0.1 ? 1 : opacity }}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id={SECTION_IDS.GITHUB} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">GitPullRequest Activity</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            My open source contributions and coding activity
          </p>
        </motion.div>
        
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-md p-8 animate-pulse">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="bg-gray-50 p-6 rounded-lg mb-6 h-64"></div>
                <div className="bg-gray-50 p-6 rounded-lg h-48"></div>
              </div>
              <div className="md:w-2/3">
                <div className="bg-gray-50 p-6 rounded-lg mb-6 h-56"></div>
                <div className="bg-gray-50 p-6 rounded-lg h-64"></div>
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">Failed to load GitPullRequest data</div>
        ) : (
          <motion.div 
            className="bg-white rounded-xl shadow-md p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                {/* Stats Overview */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Stats Overview</h3>
                    <a 
                      href="https://github.com/johndoe" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary hover:text-blue-700"
                      aria-label="GitPullRequest profile"
                    >
                      <GitHubIcon className="w-5 h-5" />
                    </a>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Repositories</span>
                        <span className="font-medium">{githubStats?.repoCount}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="bg-primary h-full rounded-full" style={{ width: "70%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Stars</span>
                        <span className="font-medium">{githubStats?.stars}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="bg-yellow-400 h-full rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Forks</span>
                        <span className="font-medium">{githubStats?.forks}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="bg-purple-500 h-full rounded-full" style={{ width: "40%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Contributions</span>
                        <span className="font-medium">{githubStats?.contributions}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Top Languages */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Top Languages</h3>
                  
                  <div className="space-y-3">
                    {githubStats?.languages.map((lang, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">{lang.name}</span>
                          <span className="font-medium">{lang.percentage}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-full rounded-full" 
                            style={{ 
                              width: `${lang.percentage}%`,
                              backgroundColor: lang.color
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="md:w-2/3">
                {/* Contribution Activity */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-bold mb-4">Contribution Activity</h3>
                  
                  {/* GitPullRequest Activity Graph */}
                  <div className="bg-white p-4 rounded-lg">
                    <div className="grid grid-cols-7 gap-1 mb-1">
                      {['Mon', '', 'Wed', '', 'Fri', '', 'Sun'].map((day, i) => (
                        <div key={i} className="text-xs text-center text-gray-400">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    {generateContributionGrid()}
                    
                    <div className="mt-2 text-xs text-gray-500 flex justify-between">
                      <span>{githubStats?.contributionPeriod?.start}</span>
                      <span>{githubStats?.contributionPeriod?.end}</span>
                    </div>
                  </div>
                </div>
                
                {/* Recent Repositories */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Recent Repositories</h3>
                  
                  <div className="space-y-4">
                    {githubStats?.recentRepos.map((repo, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border border-gray-100 hover:border-primary transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <a 
                              href={repo.url} 
                              className="font-semibold text-primary hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {repo.name}
                            </a>
                            <p className="text-sm text-gray-600 mt-1">{repo.description}</p>
                          </div>
                          <div className="flex gap-3">
                            <div className="flex items-center text-gray-500 text-sm">
                              <Star className="w-4 h-4 mr-1" />
                              <span>{repo.stars}</span>
                            </div>
                            <div className="flex items-center text-gray-500 text-sm">
                              <GitBranch className="w-4 h-4 mr-1" />
                              <span>{repo.forks}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <span 
                            className="px-2 py-1 rounded text-xs"
                            style={{
                              backgroundColor: `${repo.languageColor}25`, // 25 is hex for 15% opacity
                              color: repo.languageColor
                            }}
                          >
                            {repo.language}
                          </span>
                          <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs">
                            Updated {repo.updatedAt}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GitPullRequest;
