import React, { useState, useEffect } from 'react';
import { 
  Search, 
  BookOpen, 
  Workflow, 
  LayoutGrid, 
  TrendingUp, 
  DollarSign, 
  Film,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Play,
  CheckCircle,
  Lightbulb,
  Target,
  Zap
} from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

// Documentation categories and articles
const categories = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    icon: BookOpen,
    articles: [
      {
        id: 'how-ai-agents-work',
        title: 'How AI Agents Work in DeployrAI',
        description: 'Understand the core architecture of AI agents and how they execute tasks autonomously.',
        readTime: '5 min',
        content: {
          intro: 'AI agents in DeployrAI are not simple chatbots. They are autonomous systems designed to execute specific tasks in your content workflow—from research to final output.',
          steps: [
            { title: 'Input Processing', desc: 'You provide your niche, goals, and preferences. The system understands context.' },
            { title: 'Agent Orchestration', desc: 'Multiple specialized agents work in sequence—each handling a specific task.' },
            { title: 'Output Generation', desc: 'Final deliverables are produced: scripts, strategies, content plans.' },
            { title: 'Feedback Loop', desc: 'Results are refined based on performance data and your input.' }
          ],
          takeaways: [
            'Agents work autonomously but follow your direction',
            'Each agent specializes in one area for maximum quality',
            'The system learns and improves with usage'
          ]
        }
      },
      {
        id: 'your-first-workflow',
        title: 'Running Your First Workflow',
        description: 'A step-by-step guide to deploying your first AI agent workflow.',
        readTime: '4 min',
        content: {
          intro: 'Getting started with DeployrAI is straightforward. This guide walks you through your first complete workflow from input to output.',
          steps: [
            { title: 'Define Your Niche', desc: 'Tell the system what content area you focus on.' },
            { title: 'Set Your Goals', desc: 'Choose between growth, monetization, or scaling output.' },
            { title: 'Select Agents', desc: 'Pick which agents to deploy for your workflow.' },
            { title: 'Review Outputs', desc: 'Get your results and iterate as needed.' }
          ],
          takeaways: [
            'Start simple—one workflow at a time',
            'Review outputs before publishing',
            'Iterate based on performance'
          ]
        }
      }
    ]
  },
  {
    id: 'agent-workflows',
    name: 'Agent Workflows',
    icon: Workflow,
    articles: [
      {
        id: 'idea-to-script',
        title: 'From Idea to Script: Full Workflow Breakdown',
        description: 'The complete journey from a raw idea to a polished, ready-to-shoot script.',
        readTime: '7 min',
        content: {
          intro: 'This is the core workflow that transforms a simple idea into an execution-ready script. Multiple agents work in sequence to maximize quality.',
          steps: [
            { title: 'Trend Scout Agent', desc: 'Analyzes current trends in your niche to identify what\'s working.' },
            { title: 'Idea Generator', desc: 'Creates multiple content angles based on trends and your goals.' },
            { title: 'Hook Master', desc: 'Crafts attention-grabbing openings that stop the scroll.' },
            { title: 'Script Writer', desc: 'Produces the full script with structure, pacing, and CTA.' }
          ],
          takeaways: [
            'Each agent adds a layer of quality',
            'The pipeline is designed for high-retention content',
            'You can customize any stage of the workflow'
          ]
        }
      },
      {
        id: 'trend-analysis',
        title: 'Trend Analysis Agent Deep Dive',
        description: 'How the Trend Scout finds what\'s working across platforms in real-time.',
        readTime: '5 min',
        content: {
          intro: 'The Trend Scout Agent is your research team. It continuously monitors platforms to identify patterns, viral formats, and emerging topics in your niche.',
          steps: [
            { title: 'Platform Scanning', desc: 'Monitors YouTube, TikTok, Instagram, and X for trending content.' },
            { title: 'Pattern Recognition', desc: 'Identifies common elements in high-performing content.' },
            { title: 'Niche Filtering', desc: 'Filters trends relevant to your specific content area.' },
            { title: 'Opportunity Scoring', desc: 'Ranks trends by potential impact and competition level.' }
          ],
          takeaways: [
            'Real-time trend detection gives you a competitive edge',
            'Platform-specific insights help you tailor content',
            'Opportunity scoring helps prioritize your efforts'
          ]
        }
      }
    ]
  },
  {
    id: 'content-systems',
    name: 'Content Systems',
    icon: LayoutGrid,
    articles: [
      {
        id: 'viral-reels',
        title: 'How to Create Viral Reels Using AI',
        description: 'A systematic approach to creating short-form content that actually gets views.',
        readTime: '6 min',
        content: {
          intro: 'Viral content isn\'t luck—it\'s systems. This playbook shows you how to use AI agents to consistently create high-performing short-form content.',
          steps: [
            { title: 'Hook in First 2 Seconds', desc: 'Use pattern interrupts, bold claims, or visual hooks.' },
            { title: 'Value Delivery', desc: 'Pack maximum value into minimum time—every second counts.' },
            { title: 'Retention Optimization', desc: 'Structure content to maintain attention throughout.' },
            { title: 'Strategic CTA', desc: 'End with a clear call-to-action that drives engagement.' }
          ],
          takeaways: [
            'The first 2 seconds determine 80% of performance',
            'Consistency beats occasional viral hits',
            'Test hooks systematically, not randomly'
          ]
        }
      },
      {
        id: 'content-system',
        title: 'Content System for Consistent Growth',
        description: 'Build a repeatable system that produces quality content at scale.',
        readTime: '8 min',
        content: {
          intro: 'One viral video won\'t build a business. A content system will. Here\'s how to build one using AI agents.',
          steps: [
            { title: 'Content Pillars', desc: 'Define 3-5 core topics that align with your expertise and audience.' },
            { title: 'Production Pipeline', desc: 'Set up a weekly workflow: research → script → produce → publish.' },
            { title: 'Batch Processing', desc: 'Create multiple pieces of content in focused sessions.' },
            { title: 'Performance Review', desc: 'Weekly analysis to identify what\'s working and double down.' }
          ],
          takeaways: [
            'Systems create predictable results',
            'Batch processing increases efficiency 3x',
            'Regular review sessions prevent stagnation'
          ]
        }
      }
    ]
  },
  {
    id: 'growth-distribution',
    name: 'Growth & Distribution',
    icon: TrendingUp,
    articles: [
      {
        id: 'multi-platform',
        title: 'Multi-Platform Distribution Strategy',
        description: 'Maximize reach by strategically distributing content across platforms.',
        readTime: '6 min',
        content: {
          intro: 'Creating content is only half the battle. Strategic distribution multiplies your reach without multiplying your work.',
          steps: [
            { title: 'Platform Audit', desc: 'Identify which platforms align with your content and audience.' },
            { title: 'Content Adaptation', desc: 'Modify content format and length for each platform.' },
            { title: 'Timing Optimization', desc: 'Post when your audience is most active on each platform.' },
            { title: 'Cross-Promotion', desc: 'Drive traffic between platforms to build a unified audience.' }
          ],
          takeaways: [
            'Repurposing ≠ reposting—adapt for each platform',
            'Focus on 2-3 platforms maximum',
            'Consistency matters more than frequency'
          ]
        }
      }
    ]
  },
  {
    id: 'monetization',
    name: 'Monetization',
    icon: DollarSign,
    articles: [
      {
        id: 'content-to-revenue',
        title: 'Turning Content into Revenue',
        description: 'Multiple revenue streams from a single content strategy.',
        readTime: '7 min',
        content: {
          intro: 'Views don\'t pay bills. Revenue does. Here\'s how to build multiple income streams from your content using AI-optimized strategies.',
          steps: [
            { title: 'Ad Revenue Optimization', desc: 'Maximize watch time and retention for higher RPM.' },
            { title: 'Brand Partnerships', desc: 'Position yourself for sponsorships with targeted content.' },
            { title: 'Digital Products', desc: 'Create courses, templates, or tools from your expertise.' },
            { title: 'Community Building', desc: 'Convert audience into paying community members.' }
          ],
          takeaways: [
            'Diversify—don\'t rely on a single revenue stream',
            'High-value content attracts high-value partnerships',
            'Community is the most sustainable revenue model'
          ]
        }
      }
    ]
  },
  {
    id: 'case-studies',
    name: 'Case Studies',
    icon: Film,
    articles: [
      {
        id: 'ai-film-bts',
        title: 'Behind the Scenes of an AI Film',
        description: 'A complete breakdown of creating a short film using AI-powered workflows.',
        readTime: '10 min',
        content: {
          intro: 'This case study breaks down how we created a 3-minute AI short film—from concept to final render—using the same workflows available in DeployrAI.',
          steps: [
            { title: 'Concept Development', desc: 'AI-assisted brainstorming generated 50+ concepts in 10 minutes.' },
            { title: 'Script Generation', desc: 'Full script with scene breakdowns created in under an hour.' },
            { title: 'Visual Planning', desc: 'Shot lists and storyboards generated from script analysis.' },
            { title: 'Production & Post', desc: 'AI tools for image generation, editing assistance, and color.' }
          ],
          takeaways: [
            'AI doesn\'t replace creativity—it amplifies it',
            'Workflow integration is key to efficiency',
            'The best results come from human + AI collaboration'
          ]
        }
      }
    ]
  }
];

// Workflow visualization data
const workflowSteps = [
  { id: 'idea', label: 'Idea', icon: Lightbulb, color: 'purple' },
  { id: 'script', label: 'Script', icon: BookOpen, color: 'violet' },
  { id: 'visual', label: 'Visual', icon: Film, color: 'blue' },
  { id: 'distribution', label: 'Distribution', icon: TrendingUp, color: 'cyan' },
  { id: 'monetization', label: 'Monetization', icon: DollarSign, color: 'green' }
];

const LearnPage = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [activeArticle, setActiveArticle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const scrollToWaitlist = () => {
    window.location.href = '/#waitlist';
  };

  // Filter articles based on search
  const filteredCategories = categories.map(cat => ({
    ...cat,
    articles: cat.articles.filter(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.articles.length > 0 || searchQuery === '');

  const currentCategory = categories.find(c => c.id === activeCategory);
  const currentArticle = activeArticle 
    ? categories.flatMap(c => c.articles).find(a => a.id === activeArticle)
    : null;

  return (
    <div className="deployr-app min-h-screen">
      <div className="noise-overlay" />
      <Header onApplyClick={scrollToWaitlist} />

      <main className="pt-20 min-h-screen">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden border-b border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/15 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-400 mb-4">
                Documentation
              </p>
              <h1 
                data-testid="learn-title"
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tighter text-white mb-6 font-outfit"
              >
                Learn the System
              </h1>
              <p className="text-lg text-zinc-400 mb-4">
                Not tutorials. Execution playbooks for creators using AI.
              </p>
              <p className="text-sm text-zinc-500 mb-8">
                Understand how DeployrAI works—and how to use AI agents to actually build, grow, and monetize content.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search workflows, agents, or strategies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="learn-search-input"
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Workflow Visualization */}
            <div className="mt-16 max-w-4xl mx-auto">
              <p className="text-center text-xs text-zinc-500 uppercase tracking-widest mb-6">
                The System Flow
              </p>
              <div className="flex items-center justify-between relative">
                {/* Connection line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-green-500/50 -translate-y-1/2" />
                
                {workflowSteps.map((step, index) => (
                  <div key={step.id} className="relative z-10 flex flex-col items-center">
                    <div className={`w-14 h-14 rounded-2xl bg-${step.color}-500/20 border border-${step.color}-500/30 flex items-center justify-center mb-3 backdrop-blur-sm`}
                      style={{
                        background: `rgba(139, 92, 246, ${0.1 + index * 0.05})`,
                        borderColor: `rgba(139, 92, 246, ${0.2 + index * 0.1})`
                      }}
                    >
                      <step.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <span className="text-sm text-zinc-400 font-medium">{step.label}</span>
                    {index < workflowSteps.length - 1 && (
                      <ChevronRight className="absolute -right-4 top-5 w-4 h-4 text-zinc-600 hidden md:block" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <section className="relative py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Sidebar */}
              <aside className="lg:w-64 flex-shrink-0">
                <nav className="lg:sticky lg:top-28 space-y-2" data-testid="learn-sidebar">
                  {(searchQuery ? filteredCategories : categories).map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setActiveArticle(null);
                      }}
                      data-testid={`category-${category.id}`}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                        activeCategory === category.id
                          ? 'bg-purple-500/10 border border-purple-500/30 text-white'
                          : 'bg-white/[0.02] border border-white/5 text-zinc-400 hover:bg-white/[0.04] hover:text-white'
                      }`}
                    >
                      <category.icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{category.name}</span>
                    </button>
                  ))}
                </nav>

                {/* Microcopy */}
                <div className="mt-8 space-y-3 text-xs text-zinc-600">
                  <p>• Built for serious creators</p>
                  <p>• Learn by building</p>
                  <p>• Execution {'>'} theory</p>
                  <p>• Systems over tools</p>
                </div>
              </aside>

              {/* Content Area */}
              <div className="flex-1 min-w-0">
                {currentArticle ? (
                  /* Article View */
                  <article data-testid="article-content" className="max-w-3xl">
                    <button
                      onClick={() => setActiveArticle(null)}
                      className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white mb-6 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" />
                      Back to {currentCategory?.name}
                    </button>

                    <h2 className="text-3xl md:text-4xl font-medium text-white mb-4 font-outfit">
                      {currentArticle.title}
                    </h2>
                    <p className="text-zinc-400 mb-8 leading-relaxed">
                      {currentArticle.content.intro}
                    </p>

                    {/* Steps */}
                    <div className="space-y-4 mb-10">
                      {currentArticle.content.steps.map((step, index) => (
                        <div
                          key={index}
                          className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.04] hover:border-purple-500/20 transition-all"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                              <span className="text-sm font-bold text-purple-400">{index + 1}</span>
                            </div>
                            <div>
                              <h4 className="text-white font-medium mb-1">{step.title}</h4>
                              <p className="text-sm text-zinc-400">{step.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Key Takeaways */}
                    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/10 border border-purple-500/20 rounded-2xl p-6 mb-10">
                      <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-purple-400" />
                        Key Takeaways
                      </h3>
                      <ul className="space-y-3">
                        {currentArticle.content.takeaways.map((takeaway, index) => (
                          <li key={index} className="flex items-start gap-3 text-sm text-zinc-300">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            {takeaway}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={scrollToWaitlist}
                        data-testid="try-workflow-button"
                        className="group flex-1 bg-white text-black rounded-full px-6 py-4 font-semibold hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all flex items-center justify-center gap-2"
                      >
                        <Play className="w-5 h-5" />
                        Try This Workflow
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button
                        onClick={scrollToWaitlist}
                        className="flex-1 bg-white/5 border border-white/10 text-white rounded-full px-6 py-4 font-medium hover:bg-white/10 transition-all"
                      >
                        Apply for Early Access
                      </button>
                    </div>
                  </article>
                ) : (
                  /* Article List View */
                  <div data-testid="article-list">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-medium text-white font-outfit">
                        {currentCategory?.name}
                      </h2>
                      <span className="text-sm text-zinc-500">
                        {currentCategory?.articles.length} articles
                      </span>
                    </div>

                    <div className="grid gap-4">
                      {(searchQuery ? filteredCategories.find(c => c.id === activeCategory)?.articles : currentCategory?.articles)?.map((article) => (
                        <button
                          key={article.id}
                          onClick={() => setActiveArticle(article.id)}
                          data-testid={`article-card-${article.id}`}
                          className="group bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-left hover:bg-white/[0.04] hover:border-purple-500/20 transition-all"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-medium text-white mb-2 group-hover:text-purple-300 transition-colors">
                                {article.title}
                              </h3>
                              <p className="text-sm text-zinc-400 mb-3">
                                {article.description}
                              </p>
                              <span className="text-xs text-zinc-500">
                                {article.readTime} read
                              </span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Empty State */}
                    {searchQuery && filteredCategories.find(c => c.id === activeCategory)?.articles.length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-zinc-500">No articles found for "{searchQuery}"</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Positioning Line */}
                <div className="mt-16 pt-8 border-t border-white/5 text-center">
                  <p className="text-sm text-zinc-500 italic">
                    "This is not documentation. It's how the system works."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LearnPage;
