import Link from 'next/link'
import { ArrowRight, Code, Server, Bot, Search } from 'lucide-react'
import { Service } from '@/lib/types'

const iconMap = {
  Code,
  Server,
  Bot,
  Search
}

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon as keyof typeof iconMap] || Code

  return (
    <div className="card group hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
      <div className="flex items-start space-x-4 mb-6">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-accent-600 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
            {service.title}
          </h3>
          <p className="text-gray-400">
            {service.description}
          </p>
        </div>
      </div>
      
      <div className="space-y-2 mb-6">
        {service.features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
            <span className="text-gray-300 text-sm">{feature}</span>
          </div>
        ))}
      </div>
      
      <Link
        href={service.href}
        className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium transition-colors group"
      >
        Learn More
        <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  )
}