import Navbar from '@/components/navbar';
import { getAuth } from '@/features/auth/actions/get-auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  MessageSquare,
  Code,
  Zap,
  Users,
  ArrowRight,
  Star,
  CheckCircle,
} from 'lucide-react';

const HomePage = async () => {
  const { user } = await getAuth();

  return (
    <>
      <Navbar user={user} />

      <div className="min-h-screen bg-white pt-20">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-20">
            <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Polymorphic Comment System
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              A production-ready, drop-in comment system built with
              Next.js 15, React Server Components, and Prisma.
              Supports polymorphic relationships, threaded replies,
              and real-time interactions.
            </p>
            <div className="flex gap-4 justify-center mb-12">
              <Button
                asChild
                size="lg"
                className="bg-slate-900 hover:bg-slate-800"
              >
                <Link
                  href="/article"
                  className="flex items-center gap-2"
                >
                  View Article Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <Link
                  href="/episode"
                  className="flex items-center gap-2"
                >
                  View Episode Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="flex justify-center gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Polymorphic Design</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Threaded Replies</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Drop-in Integration</span>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <MessageSquare className="h-8 w-8 text-slate-700 mb-3" />
                <CardTitle className="text-slate-900">
                  Polymorphic Design
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Attach comments to any entity type - articles,
                  episodes, products, or custom models with just two
                  props.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <Users className="h-8 w-8 text-slate-700 mb-3" />
                <CardTitle className="text-slate-900">
                  Threaded Replies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Single-level threaded replies with efficient loading
                  using React Server Components.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <Zap className="h-8 w-8 text-slate-700 mb-3" />
                <CardTitle className="text-slate-900">
                  Server Components
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Built with Next.js 15 App Router and React Server
                  Components for optimal performance and SEO.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <Code className="h-8 w-8 text-slate-700 mb-3" />
                <CardTitle className="text-slate-900">
                  Drop-in Ready
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-600">
                  Simple integration with just two props - entity type
                  and entity ID. No complex setup required.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Demo Section */}
          <div className="bg-slate-50 rounded-xl p-12 mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
              Live Demo
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <MessageSquare className="h-8 w-8 text-slate-700" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900">
                  Article Comments
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  See how comments work on blog articles with full
                  CRUD operations and threaded replies.
                </p>
                <Button
                  asChild
                  className="w-full bg-slate-900 hover:bg-slate-800"
                >
                  <Link href="/article">Try Article Demo</Link>
                </Button>
              </div>
              <div className="text-center">
                <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Users className="h-8 w-8 text-slate-700" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-slate-900">
                  Episode Comments
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Same comment system working on podcast episodes -
                  demonstrating true polymorphic behavior.
                </p>
                <Button
                  asChild
                  className="w-full bg-slate-900 hover:bg-slate-800"
                >
                  <Link href="/episode">Try Episode Demo</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-slate-900 rounded-xl p-12 mb-20">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Simple Integration
            </h2>
            <div className="max-w-4xl mx-auto">
              <pre className="text-emerald-400 p-8 rounded-lg overflow-x-auto text-sm bg-slate-800 border border-slate-700">
                {`// Just two lines to add comments to any page
<Comments entity="ARTICLE" entityId={article.id} />

// Works with any entity type - same component!
<Comments entity="EPISODE" entityId={episode.id} />
<Comments entity="PRODUCT" entityId={product.id} />
<Comments entity="POST" entityId={post.id} />

// The system automatically handles:
// ✅ Loading comments for the specific entity
// ✅ User authentication and permissions
// ✅ Creating, editing, and deleting comments
// ✅ Single-level threaded replies
// ✅ Real-time updates with Server Components`}
              </pre>
            </div>
          </div>

          {/* Technical Details */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
              Technical Stack
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900">
                    <Code className="h-5 w-5 text-slate-700" />
                    Frontend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-slate-700">
                        Next.js 15 with App Router
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-slate-700">
                        React Server Components
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-slate-700">
                        TypeScript
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-slate-700">
                        Tailwind CSS
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-slate-700">
                        Lucide Icons
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900">
                    <Zap className="h-5 w-5 text-slate-700" />
                    Backend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-slate-700">
                        Prisma ORM
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-slate-700">
                        PostgreSQL Database
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-slate-700">
                        Server Actions
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-slate-700">
                        Session Management
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-slate-700">
                        Polymorphic Relations
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-900">
                    <Users className="h-5 w-5 text-slate-700" />
                    Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-slate-700">
                        User Authentication
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-slate-700">
                        CRUD Operations
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-slate-700">
                        Single-level Replies
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-slate-700">
                        Real-time Updates
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-slate-700">
                        Responsive Design
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-slate-50 rounded-xl p-12">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">
              Perfect For
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <MessageSquare className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="font-semibold mb-2 text-slate-900">
                  Blog Platforms
                </h3>
                <p className="text-sm text-slate-600">
                  Article comments and discussions
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Users className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="font-semibold mb-2 text-slate-900">
                  Podcast Apps
                </h3>
                <p className="text-sm text-slate-600">
                  Episode discussions and feedback
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Star className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="font-semibold mb-2 text-slate-900">
                  E-commerce Sites
                </h3>
                <p className="text-sm text-slate-600">
                  Product reviews and Q&A
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Code className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="font-semibold mb-2 text-slate-900">
                  Documentation
                </h3>
                <p className="text-sm text-slate-600">
                  Page feedback and questions
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <MessageSquare className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="font-semibold mb-2 text-slate-900">
                  Social Platforms
                </h3>
                <p className="text-sm text-slate-600">
                  Post interactions and discussions
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Zap className="h-6 w-6 text-slate-700" />
                </div>
                <h3 className="font-semibold mb-2 text-slate-900">
                  Any Content
                </h3>
                <p className="text-sm text-slate-600">
                  Custom entity types and models
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
