import PageNav from '@/components/page-nav';
import { getArticle } from '@/features/article/queries/getArticle';
import { Comments } from '@/features/comments/components/comments';
import { Suspense } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  MessageSquare,
  Code,
  ArrowLeft,
  Users,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ArticlePage = async () => {
  const article = await getArticle();

  if (!article) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <PageNav />

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <Button
            asChild
            variant="ghost"
            className="mb-6 text-slate-600 hover:text-slate-900"
          >
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Demo
            </Link>
          </Button>

          <div className="bg-slate-50 rounded-xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <MessageSquare className="h-6 w-6 text-slate-700" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">
                Sample Article
              </h1>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              This is a demonstration of how the polymorphic comment
              system works on articles. The same component can be used
              on any content type with just two props.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Entity Type: ARTICLE</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Entity ID: {article.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <Card className="mb-12 border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <MessageSquare className="h-5 w-5" />
              Article Comments
            </CardTitle>
            <p className="text-sm text-slate-600">
              Try creating, editing, and replying to comments. Notice
              how the same system works across different content
              types. This demonstrates true polymorphic behavior.
            </p>
          </CardHeader>
          <CardContent>
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600"></div>
                </div>
              }
            >
              <Comments entity="ARTICLE" entityId={article.id} />
            </Suspense>
          </CardContent>
        </Card>

        {/* Code Example */}
        <Card className="mb-12 border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Code className="h-5 w-5" />
              Implementation Example
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-900 text-emerald-400 p-6 rounded-lg overflow-x-auto text-sm border border-slate-700">
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
// ✅ Threaded replies with infinite depth
// ✅ Real-time updates with Server Components`}
            </pre>
          </CardContent>
        </Card>

        {/* Features Showcase */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Users className="h-5 w-5" />
              System Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-900">
                  <MessageSquare className="h-5 w-5 text-slate-700" />
                  Polymorphic Comments
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-slate-700">
                      Attach to any entity type
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-slate-700">
                      Same component, different contexts
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-slate-700">
                      Type-safe with TypeScript
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-900">
                  <Users className="h-5 w-5 text-slate-700" />
                  Threaded Replies
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-slate-700">
                      Nested comment threads
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-slate-700">
                      Infinite depth support
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-slate-700">
                      Efficient loading
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArticlePage;
