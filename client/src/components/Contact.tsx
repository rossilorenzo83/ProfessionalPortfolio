import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { SECTION_IDS, API_ENDPOINTS } from "@/lib/constants";
import { ContactInfo, ContactFormData } from "@/types";
import { Mail, Phone, MapPin, Linkedin, GitPullRequest, Twitter } from "lucide-react";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { data: contactInfo } = useQuery<ContactInfo>({
    queryKey: [API_ENDPOINTS.CONTACT],
  });

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ContactFormData) => {
      return apiRequest("POST", API_ENDPOINTS.CONTACT, data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      form.reset();
      setIsSubmitting(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    setIsSubmitting(true);
    mutation.mutate(data);
  };

  return (
    <section id={SECTION_IDS.CONTACT} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Have a project in mind or just want to say hello? Feel free to reach out!
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
            <div className="md:w-1/3 bg-primary p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="mb-8">Fill out the form and I'll get back to you as soon as possible.</p>
              
              <div className="space-y-6">
                {contactInfo?.email && (
                  <div className="flex items-start">
                    <div className="bg-blue-600 p-2 rounded-full mr-4">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-blue-200 mb-1">Email</h4>
                      <a href={`mailto:${contactInfo.email}`} className="font-medium hover:underline">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                )}
                
                {contactInfo?.phone && (
                  <div className="flex items-start">
                    <div className="bg-blue-600 p-2 rounded-full mr-4">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-blue-200 mb-1">Phone</h4>
                      <a href={`tel:${contactInfo.phone}`} className="font-medium hover:underline">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                )}
                
                {contactInfo?.location && (
                  <div className="flex items-start">
                    <div className="bg-blue-600 p-2 rounded-full mr-4">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-blue-200 mb-1">Location</h4>
                      <p className="font-medium">{contactInfo.location}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {contactInfo?.social && (
                <div className="mt-12">
                  <h4 className="text-sm font-medium text-blue-200 mb-3">Connect with me</h4>
                  <div className="flex space-x-4">
                    {contactInfo.social.linkedin && (
                      <a 
                        href={contactInfo.social.linkedin} 
                        className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn profile"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {contactInfo.social.github && (
                      <a 
                        href={contactInfo.social.github} 
                        className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitPullRequest profile"
                      >
                        <GitPullRequest className="w-5 h-5" />
                      </a>
                    )}
                    {contactInfo.social.twitter && (
                      <a 
                        href={contactInfo.social.twitter} 
                        className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter profile"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="md:w-2/3 p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Name</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Your name" 
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email" 
                              placeholder="Your email" 
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Subject</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Subject of your message" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Your message" 
                            rows={5} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition-colors"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
