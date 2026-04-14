import { Reveal } from '../components/ui/Reveal';
import { TextReveal } from '../components/ui/TextReveal';
import { ArrowRight, Mail, MapPin, Phone, Globe, Users, Zap, CheckCircle2, Upload, Briefcase } from 'lucide-react';
import { Magnetic } from '../components/ui/Magnetic';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Join Us Form State
  const [isJoinSubmitted, setIsJoinSubmitted] = useState(false);
  const [joinEmail, setJoinEmail] = useState('');
  const [joinRole, setJoinRole] = useState('');
  const [joinMessage, setJoinMessage] = useState('');
  const [joinFileName, setJoinFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000); // Reset after 5 seconds
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = encodeURIComponent(`Job Application: ${joinRole}`);
    const body = encodeURIComponent(`Applicant Email: ${joinEmail}\n\nMessage:\n${joinMessage}\n\n*** Note: Please ensure your resume (${joinFileName || 'file'}) is attached to this email before sending. ***`);
    
    window.location.href = `mailto:careers@vaidik.co?subject=${subject}&body=${body}`;
    
    setIsJoinSubmitted(true);
    setTimeout(() => {
      setIsJoinSubmitted(false);
      setJoinEmail('');
      setJoinRole('');
      setJoinMessage('');
      setJoinFileName('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 5000);
  };

  return (
    <div className="w-full pt-32 pb-24 min-h-[80vh] flex flex-col justify-center relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <TextReveal 
              text="Let's build something global."
              className="text-5xl md:text-7xl font-semibold tracking-tighter mb-8"
            />
            <Reveal delay={0.2}>
              <p className="text-xl text-muted-foreground mb-12 max-w-md leading-relaxed">
                Whether you need high-end production, complex localization, or AI data solutions, our global team is ready to partner with you. Reach out to start the conversation.
              </p>
            </Reveal>

            {/* Why Work With Us */}
            <Reveal delay={0.3}>
              <div className="grid grid-cols-2 gap-6 mb-16">
                <div className="p-6 rounded-2xl bg-muted/50 border border-border">
                  <Globe className="text-blue-500 mb-4" size={24} />
                  <h4 className="font-semibold mb-2">Global Reach</h4>
                  <p className="text-sm text-muted-foreground">Operating in 50+ languages across 12 time zones.</p>
                </div>
                <div className="p-6 rounded-2xl bg-muted/50 border border-border">
                  <Zap className="text-amber-500 mb-4" size={24} />
                  <h4 className="font-semibold mb-2">Fast Execution</h4>
                  <p className="text-sm text-muted-foreground">Streamlined workflows for rapid, high-quality delivery.</p>
                </div>
                <div className="p-6 rounded-2xl bg-muted/50 border border-border col-span-2 flex items-center gap-4">
                  <Users className="text-emerald-500 shrink-0" size={24} />
                  <div>
                    <h4 className="font-semibold mb-1">Dedicated Teams</h4>
                    <p className="text-sm text-muted-foreground">You get a dedicated project manager and specialized creative team for every project.</p>
                  </div>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={0.4}>
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">General Inquiries</h3>
                    <a href="mailto:hello@vaidik.co" className="text-2xl font-medium hover:text-primary transition-colors">hello@vaidik.co</a>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Global Headquarters</h3>
                    <p className="text-xl font-medium">
                      123 Creative District<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1 uppercase tracking-wider">Direct Line</h3>
                    <a href="tel:+12125550199" className="text-xl font-medium hover:text-primary transition-colors">+1 (212) 555-0199</a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.5}>
              <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 md:p-12 rounded-[2.5rem] border border-border shadow-2xl shadow-black/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-semibold mb-2">Start a Project</h3>
                  <p className="text-muted-foreground mb-8">Fill out the form below and our team will get back to you within 24 hours.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-muted-foreground">First Name</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        required
                        className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-transparent focus:border-primary focus:bg-background focus:ring-0 transition-all outline-none"
                        placeholder="Jane"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-muted-foreground">Last Name</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        required
                        className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-transparent focus:border-primary focus:bg-background focus:ring-0 transition-all outline-none"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-transparent focus:border-primary focus:bg-background focus:ring-0 transition-all outline-none"
                      placeholder="jane@company.com"
                    />
                  </div>

                  <div className="space-y-2 mb-8">
                    <label htmlFor="interest" className="text-sm font-medium text-muted-foreground">Area of Interest</label>
                    <select 
                      id="interest" 
                      required
                      className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-transparent focus:border-primary focus:bg-background focus:ring-0 transition-all outline-none appearance-none cursor-pointer"
                    >
                      <option value="">Select a service...</option>
                      <option value="media">Media & Production</option>
                      <option value="language">Language Services</option>
                      <option value="ai">AI Data Solutions</option>
                      <option value="multiple">Multiple Services</option>
                    </select>
                  </div>

                  <div className="space-y-2 mb-8">
                    <label htmlFor="message" className="text-sm font-medium text-muted-foreground">Project Details</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      required
                      className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-transparent focus:border-primary focus:bg-background focus:ring-0 transition-all outline-none resize-none"
                      placeholder="Tell us about your goals, timeline, and any specific requirements..."
                    />
                  </div>

                  <Magnetic intensity={0.1}>
                    <button 
                      type="submit"
                      disabled={isSubmitted}
                      className="w-full py-5 bg-primary text-primary-foreground rounded-2xl font-medium hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:hover:scale-100"
                    >
                      Submit Request <ArrowRight size={18} />
                    </button>
                  </Magnetic>

                  <AnimatePresence>
                    {isSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-card/95 backdrop-blur-sm rounded-[2.5rem] border border-emerald-500/20"
                      >
                        <div className="relative mb-6">
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
                            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                            className="absolute inset-0 rounded-full bg-emerald-500/20"
                          />
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                            className="relative w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center"
                          >
                            <svg className="w-10 h-10 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <motion.path
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                                d="M20 6L9 17l-5-5"
                              />
                            </svg>
                          </motion.div>
                        </div>
                        <h3 className="text-2xl font-semibold mb-2 text-center">Request Received!</h3>
                        <p className="text-muted-foreground text-center max-w-[250px]">
                          Thank you for reaching out. Our team will contact you shortly.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Join Us Section */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 mt-32">
        <Reveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-muted rounded-2xl mb-6">
              <Briefcase className="text-primary" size={28} />
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Join Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're always looking for exceptional talent. If you're passionate about global storytelling, we want to hear from you.
            </p>
          </div>
        </Reveal>

        <div className="max-w-3xl mx-auto">
          <Reveal delay={0.2}>
            <form onSubmit={handleJoinSubmit} className="space-y-6 bg-card p-8 md:p-12 rounded-[2.5rem] border border-border shadow-2xl shadow-black/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label htmlFor="joinEmail" className="text-sm font-medium text-muted-foreground">Email Address</label>
                    <input 
                      type="email" 
                      id="joinEmail" 
                      required
                      value={joinEmail}
                      onChange={(e) => setJoinEmail(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-transparent focus:border-primary focus:bg-background focus:ring-0 transition-all outline-none"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="joinRole" className="text-sm font-medium text-muted-foreground">Role Applying For</label>
                    <input 
                      type="text" 
                      id="joinRole" 
                      required
                      value={joinRole}
                      onChange={(e) => setJoinRole(e.target.value)}
                      className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-transparent focus:border-primary focus:bg-background focus:ring-0 transition-all outline-none"
                      placeholder="e.g. Senior Video Editor"
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <label htmlFor="joinMessage" className="text-sm font-medium text-muted-foreground">Why Vaidik Co.?</label>
                  <textarea 
                    id="joinMessage" 
                    rows={4}
                    required
                    value={joinMessage}
                    onChange={(e) => setJoinMessage(e.target.value)}
                    className="w-full px-5 py-4 rounded-2xl bg-muted/50 border border-transparent focus:border-primary focus:bg-background focus:ring-0 transition-all outline-none resize-none"
                    placeholder="Tell us about yourself and why you'd be a great fit..."
                  />
                </div>

                <div className="space-y-2 mb-8">
                  <label className="text-sm font-medium text-muted-foreground">Resume / CV</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      id="resume" 
                      ref={fileInputRef}
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setJoinFileName(e.target.files?.[0]?.name || '')}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className={`w-full px-5 py-6 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${joinFileName ? 'border-primary bg-primary/5' : 'border-border bg-muted/30 hover:bg-muted/50'}`}>
                      <Upload className={`mb-2 ${joinFileName ? 'text-primary' : 'text-muted-foreground'}`} size={24} />
                      <span className={`text-sm font-medium ${joinFileName ? 'text-primary' : 'text-muted-foreground'}`}>
                        {joinFileName ? joinFileName : 'Click or drag to upload resume (PDF, DOCX)'}
                      </span>
                      <span className="text-xs text-muted-foreground mt-1">
                        Note: You will need to attach this file in your email client.
                      </span>
                    </div>
                  </div>
                </div>

                <Magnetic intensity={0.1}>
                  <button 
                    type="submit"
                    disabled={isJoinSubmitted}
                    className="w-full py-5 bg-foreground text-background rounded-2xl font-medium hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-black/10 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    Prepare Application Email <ArrowRight size={18} />
                  </button>
                </Magnetic>

                <AnimatePresence>
                  {isJoinSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-card/95 backdrop-blur-sm rounded-[2.5rem] border border-emerald-500/20"
                    >
                      <div className="relative mb-6">
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
                          transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                          className="absolute inset-0 rounded-full bg-emerald-500/20"
                        />
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
                          className="relative w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center"
                        >
                          <svg className="w-10 h-10 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <motion.path
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                              d="M20 6L9 17l-5-5"
                            />
                          </svg>
                        </motion.div>
                      </div>
                      <h3 className="text-2xl font-semibold mb-2 text-center">Email Client Opened!</h3>
                      <p className="text-muted-foreground text-center max-w-[300px]">
                        Please remember to manually attach your resume ({joinFileName}) before sending the email.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
