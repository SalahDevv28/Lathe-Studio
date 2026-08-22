import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  CheckCircle,
  MessageCircle,
  Search,
  PenTool,
  ZapIcon,
  Globe,
  Workflow,
} from 'lucide-react'
import SectionDivider from '@/components/SectionDivider'
import CaseStudiesCarousel from '@/components/CaseStudiesCarousel'

const services = [
  {
    icon: Globe,
    title: 'Modern Websites',
    description: 'We build fast, responsive, and visually stunning websites using Next.js, React, and modern web technologies. Every site is crafted to convert visitors into customers.',
    features: ['Next.js & React', 'Responsive Design', 'SEO Optimized', 'Performance First'],
  },
  {
    icon: Workflow,
    title: 'Notion Systems',
    description: 'We transform Notion into a powerful business operations hub. Custom databases, automated workflows, and seamless integrations that keep your team organized and productive.',
    features: ['Custom Databases', 'Workflow Automation', 'Team Training', 'Ongoing Support'],
  },
  {
    icon: Bot,
    title: 'AI Automations',
    description: 'Intelligent AI agents and automations that handle repetitive tasks, analyze data, and supercharge your workflows. We build systems that work while you sleep.',
    features: ['AI Agents', 'Smart Workflows', 'Data Processing', 'Custom Integrations'],
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">You</span>
              <br />
              Intelligent Digital Solutions
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              We help you transform your digital presence and operate at peak efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://calendly.com/salahdevv/request-a-call"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Book a discovery call
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/contact"
                className="px-8 py-4 bg-transparent border-2 border-purple-500 text-white font-semibold rounded-lg hover:bg-purple-500/20 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 px-6 lg:px-24 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              What <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">We Do</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We specialize in three core areas that help businesses thrive in the digital age.
              Each service is tailored to your unique needs and goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div key={index} className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
      <section id="services" className="py-20 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Design Philosophy</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We believe in the power of AI-enhanced Notion systems to transform how businesses operate.
              Our approach combines clean design, intelligent automation, and seamless user experiences.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">Understand First</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Every great system starts with deep understanding. We take the time to learn your workflows, challenges, and goals before designing a solution.
              </p>
              <p className="text-gray-300 text-sm">
                We analyze your current setup, identify pain points, and map out opportunities for AI-driven improvements.
              </p>
            </div>
            <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <PenTool className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">Design with Purpose</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Clean, intuitive design isn&apos;t just about aesthetics, it&apos;s about creating systems that people actually want to use.
              </p>
              <p className="text-gray-300 text-sm">
                We craft workspaces that are both beautiful and functional, with careful attention to user experience and information architecture.
              </p>
            </div>
            <div className="group p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ZapIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">Automate Intelligently</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                AI should enhance human work, not replace it. We build smart automations that handle repetitive tasks while preserving human creativity.
              </p>
              <p className="text-gray-300 text-sm">
                From automated workflows to AI-powered insights, we create systems that learn, adapt, and make your team more productive every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider variant="accent" />

      {/* Case Studies Carousel */}
      <CaseStudiesCarousel />

      <SectionDivider variant="subtle" />

      {/* CTA */}
      <section className="py-20 px-6 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 md:p-12">
            <MessageCircle className="w-16 h-16 text-pink-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your project and see how we can help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://calendly.com/salahdevv/request-a-call"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-lg"
              >
                Book a discovery call
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-purple-500 text-white font-semibold rounded-lg hover:bg-purple-500/20 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-lg"
              >
                Get in touch
              </Link>
            </div>
            <p className="text-gray-400 text-sm mt-4">Free 30-minute consultation to discuss your needs</p>
          </div>
        </div>
      </section>

    </div>
  )
}
