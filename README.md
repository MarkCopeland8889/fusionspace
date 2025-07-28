# AI Website Builder 🚀

A powerful AI-powered website and app builder that lets you create stunning websites just by describing what you want. Built with modern web technologies and designed for both developers and non-developers.

## ✨ Features

### 🤖 AI-Powered Generation
- **Natural Language Input**: Describe your website in plain English
- **Smart Code Generation**: AI creates professional HTML/CSS/JavaScript code
- **Context-Aware**: Understands business types, design preferences, and functionality

### 🎨 Visual Editor
- **Live Preview**: See changes in real-time
- **Code Editor**: Professional Monaco editor (same as VS Code)
- **AI Assistant**: Ask AI to make changes with natural language
- **Responsive Design**: Preview on desktop, tablet, and mobile

### 🚀 Business Tools
- **Website Launch**: One-click deployment with free hosting
- **Marketing Tools**: Email campaigns, social media integration
- **Analytics**: Google Analytics setup and conversion tracking
- **SEO Optimization**: Automatic meta tags and performance optimization

### 💼 Business Features
- **Domain Management**: Free domain registration
- **SSL Certificates**: Automatic HTTPS setup
- **Social Media Integration**: Connect Instagram, Facebook, Twitter, LinkedIn
- **Content Calendar**: AI-generated content suggestions

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor (VS Code's editor)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI Integration**: OpenAI API (ready to integrate)
- **Deployment**: Vercel (recommended)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-website-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ai-website-builder/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── PromptInput.tsx    # AI prompt interface
│   ├── CodeEditor.tsx     # Code editor with AI
│   ├── LivePreview.tsx    # Live preview
│   └── BusinessTools.tsx  # Business features
├── public/               # Static assets
└── package.json          # Dependencies
```

## 🎯 How to Use

### 1. Create Your Website
1. Go to the **AI Prompt** tab
2. Describe your website (e.g., "Create a modern restaurant website with online ordering")
3. Click "Generate Website"
4. Watch as AI creates your website!

### 2. Edit and Customize
1. Switch to the **Code Editor** tab
2. Edit code manually or ask AI for changes
3. Use the AI assistant: "Add a contact form" or "Change colors to blue"

### 3. Preview and Test
1. Go to **Live Preview** to see your website
2. Test on different devices (desktop, tablet, mobile)
3. Check performance and accessibility scores

### 4. Launch Your Business
1. Visit **Business Tools**
2. Set up domain and hosting
3. Configure marketing and analytics
4. Launch your website!

## 🔧 Configuration

### OpenAI API Integration
To enable real AI code generation:

1. Get an OpenAI API key from [OpenAI](https://platform.openai.com/)
2. Create a `.env.local` file:
   ```env
   OPENAI_API_KEY=your_api_key_here
   ```
3. Update the AI functions in components to use the actual API

### Customization
- **Colors**: Edit `tailwind.config.js` for brand colors
- **Components**: Modify components in the `components/` directory
- **Styling**: Update `app/globals.css` for custom styles

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms
- **Netlify**: Works with Next.js static export
- **AWS Amplify**: Full-stack deployment
- **DigitalOcean App Platform**: Simple deployment

## 🎨 Customization

### Adding New Features
1. Create new components in `components/`
2. Add new tabs in `app/page.tsx`
3. Update navigation and routing

### AI Prompts
Customize the AI behavior by modifying:
- `generateSampleCode()` function in `app/page.tsx`
- AI assistant prompts in `components/CodeEditor.tsx`

### Business Tools
Extend business features in `components/BusinessTools.tsx`:
- Add new marketing channels
- Integrate with third-party APIs
- Custom analytics dashboards

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and code comments
- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

## 🎯 Roadmap

- [ ] Real OpenAI API integration
- [ ] More website templates
- [ ] E-commerce features
- [ ] Advanced analytics
- [ ] Team collaboration
- [ ] Mobile app builder
- [ ] AI-powered SEO optimization
- [ ] Multi-language support

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- Animations with [Framer Motion](https://www.framer.com/motion/)

---

**Ready to build your next website? Start creating with AI today! 🚀** 