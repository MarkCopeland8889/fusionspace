import Header from '@/components/landing/Header'
import Footer from '@/components/landing/Footer'
import { Sparkles, Clock, Code, Users, Award, MapPin, GraduationCap } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            About FusionSpace
          </h1>
          <p className="max-w-3xl mx-auto mt-6 text-xl leading-8 text-gray-600">
            We understand the frustration of wanting to build something amazing but not having the time or technical skills to make it happen.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-6">
              At FusionSpace, we believe that great ideas shouldn't be limited by technical barriers. Whether you're a busy entrepreneur, 
              a creative professional, or someone who simply wants to bring their vision to life, we're here to bridge the gap between 
              imagination and reality.
            </p>
            <p className="mb-6">
              We've seen too many brilliant concepts never see the light of day because the technical implementation seemed overwhelming. 
              That's why we built FusionSpace - to democratize web development and make it accessible to everyone, regardless of their 
              coding background.
            </p>
            <p>
              Our platform combines the power of artificial intelligence with intuitive design tools, allowing you to create professional 
              websites and applications that would traditionally require months of development work and thousands of dollars in costs.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Drives Us</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-blue-600 bg-blue-100 rounded-full">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Time is Precious</h3>
            <p className="text-gray-600">
              We understand that your time is valuable. That's why we've built tools that work as fast as you think.
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-green-600 bg-green-100 rounded-full">
              <Code className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Accessibility First</h3>
            <p className="text-gray-600">
              We believe that powerful tools should be accessible to everyone, not just those with technical backgrounds.
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-purple-600 bg-purple-100 rounded-full">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Focused</h3>
            <p className="text-gray-600">
              We're building more than a platform - we're building a community of creators, innovators, and dreamers.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Meet the Founder</h2>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-white" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Colton Scott</h3>
                <p className="text-lg text-gray-600 mb-6">Founder & CEO</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">Clemson University</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Clemson, South Carolina</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700">Computer Science</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Code className="w-5 h-5 text-orange-600" />
                    <span className="text-gray-700">Full-Stack Developer</span>
                  </div>
                </div>
                
                <div className="prose prose-gray">
                  <p className="mb-4">
                    Colton's journey into technology began at Clemson University, where he studied Computer Science and discovered 
                    his passion for making complex technology accessible to everyone. After graduating, he worked on various projects 
                    that highlighted the gap between great ideas and technical implementation.
                  </p>
                  <p className="mb-4">
                    Frustrated by seeing brilliant entrepreneurs and creators struggle to bring their visions to life due to technical 
                    barriers, Colton decided to build a solution. His deep understanding of both the technical and business sides of 
                    web development led to the creation of FusionSpace.
                  </p>
                  <p>
                    Today, Colton is committed to democratizing web development and ensuring that anyone with a great idea can bring 
                    it to life, regardless of their technical background. His vision is to make FusionSpace the go-to platform for 
                    creators, entrepreneurs, and businesses who want to build amazing digital experiences without the traditional 
                    barriers of time, cost, and technical complexity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using FusionSpace to bring their ideas to life. 
            Start building your next project today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/sign-up"
              className="inline-flex items-center justify-center px-8 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Building Free
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} 