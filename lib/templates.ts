export interface Template {
  id: string
  name: string
  description: string
  category: TemplateCategory
  tags: string[]
  previewUrl: string
  thumbnailUrl: string
  price: number
  isPremium: boolean
  features: string[]
  code: string
  promptExamples: string[]
}

export type TemplateCategory = 
  | 'business'
  | 'ecommerce'
  | 'portfolio'
  | 'landing'
  | 'blog'
  | 'saas'
  | 'restaurant'
  | 'agency'

export const TEMPLATE_CATEGORIES: Record<TemplateCategory, string> = {
  business: 'Business',
  ecommerce: 'E-commerce',
  portfolio: 'Portfolio',
  landing: 'Landing Page',
  blog: 'Blog',
  saas: 'SaaS',
  restaurant: 'Restaurant',
  agency: 'Agency'
}

export const TEMPLATES: Template[] = [
  {
    id: 'modern-business',
    name: 'Modern Business',
    description: 'Clean, professional business website with modern design',
    category: 'business',
    tags: ['professional', 'clean', 'modern', 'responsive'],
    previewUrl: '/templates/modern-business',
    thumbnailUrl: '/images/templates/modern-business.jpg',
    price: 0,
    isPremium: false,
    features: ['Responsive Design', 'Contact Form', 'About Section', 'Services'],
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Business</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <h1 class="text-xl font-bold text-gray-900">Your Business</h1>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="#home" class="text-gray-700 hover:text-gray-900">Home</a>
                    <a href="#about" class="text-gray-700 hover:text-gray-900">About</a>
                    <a href="#services" class="text-gray-700 hover:text-gray-900">Services</a>
                    <a href="#contact" class="text-gray-700 hover:text-gray-900">Contact</a>
                </div>
            </div>
        </div>
    </nav>
    
    <main>
        <section id="home" class="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-4xl font-bold mb-4">Welcome to Your Business</h2>
                <p class="text-xl mb-8">We help businesses grow and succeed</p>
                <button class="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                    Get Started
                </button>
            </div>
        </section>
    </main>
</body>
</html>`,
    promptExamples: [
      "Create a modern business website for a consulting company",
      "Build a professional website for a law firm",
      "Design a clean business site for a marketing agency"
    ]
  },
  {
    id: 'ecommerce-store',
    name: 'E-commerce Store',
    description: 'Full-featured online store with shopping cart and product catalog',
    category: 'ecommerce',
    tags: ['shop', 'products', 'cart', 'payment'],
    previewUrl: '/templates/ecommerce-store',
    thumbnailUrl: '/images/templates/ecommerce-store.jpg',
    price: 29,
    isPremium: true,
    features: ['Product Catalog', 'Shopping Cart', 'Payment Integration', 'Inventory Management'],
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online Store</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <h1 class="text-xl font-bold text-gray-900">Online Store</h1>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="#products" class="text-gray-700 hover:text-gray-900">Products</a>
                    <a href="#cart" class="text-gray-700 hover:text-gray-900">Cart (0)</a>
                    <a href="#account" class="text-gray-700 hover:text-gray-900">Account</a>
                </div>
            </div>
        </div>
    </nav>
    
    <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white rounded-lg shadow-sm p-6">
                <div class="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                <h3 class="font-semibold text-gray-900 mb-2">Product 1</h3>
                <p class="text-gray-600 mb-4">$29.99</p>
                <button class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Add to Cart
                </button>
            </div>
        </div>
    </main>
</body>
</html>`,
    promptExamples: [
      "Create an online store for handmade jewelry",
      "Build an e-commerce site for electronics",
      "Design a fashion store website"
    ]
  },
  {
    id: 'portfolio-showcase',
    name: 'Portfolio Showcase',
    description: 'Beautiful portfolio website for creatives and professionals',
    category: 'portfolio',
    tags: ['creative', 'showcase', 'gallery', 'personal'],
    previewUrl: '/templates/portfolio-showcase',
    thumbnailUrl: '/images/templates/portfolio-showcase.jpg',
    price: 0,
    isPremium: false,
    features: ['Project Gallery', 'About Section', 'Contact Form', 'Social Links'],
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <h1 class="text-xl font-bold text-gray-900">Portfolio</h1>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="#work" class="text-gray-700 hover:text-gray-900">Work</a>
                    <a href="#about" class="text-gray-700 hover:text-gray-900">About</a>
                    <a href="#contact" class="text-gray-700 hover:text-gray-900">Contact</a>
                </div>
            </div>
        </div>
    </nav>
    
    <main>
        <section class="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 class="text-4xl font-bold mb-4">Creative Portfolio</h2>
                <p class="text-xl mb-8">Showcasing amazing work and projects</p>
            </div>
        </section>
        
        <section id="work" class="py-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h3 class="text-3xl font-bold text-gray-900 mb-8">Featured Work</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div class="w-full h-64 bg-gray-200"></div>
                        <div class="p-6">
                            <h4 class="font-semibold text-gray-900 mb-2">Project 1</h4>
                            <p class="text-gray-600">Description of the project</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</body>
</html>`,
    promptExamples: [
      "Create a portfolio for a graphic designer",
      "Build a showcase website for a photographer",
      "Design a portfolio for a web developer"
    ]
  }
]

export function getTemplatesByCategory(category: TemplateCategory): Template[] {
  return TEMPLATES.filter(template => template.category === category)
}

export function getTemplateById(id: string): Template | undefined {
  return TEMPLATES.find(template => template.id === id)
}

export function searchTemplates(query: string): Template[] {
  const lowercaseQuery = query.toLowerCase()
  return TEMPLATES.filter(template => 
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
} 