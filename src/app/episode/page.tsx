import PageNav from '@/components/page-nav';
import { Comments } from '@/features/comments/components/comments';
import { getEpisode } from '@/features/episode/queries/getEpisode';
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
  Play,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const EpisodePage = async () => {
  const episode = await getEpisode();

  if (!episode) {
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
                <Play className="h-6 w-6 text-slate-700" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900">
                Sample Episode
              </h1>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              This demonstrates the same polymorphic comment system
              working on podcast episodes. Notice how the identical
              component handles different entity types seamlessly.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Entity Type: EPISODE</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Entity ID: {episode.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <Card className="mb-12 border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <MessageSquare className="h-5 w-5" />
              Episode Comments
            </CardTitle>
            <p className="text-sm text-slate-600">
              The exact same comment system from the article page, now
              working on episodes. This showcases the true power of
              polymorphic design - one component, multiple contexts.
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
              <Comments entity="EPISODE" entityId={episode.id} />
            </Suspense>
          </CardContent>
        </Card>

        {/* Polymorphic Comparison */}
        <Card className="mb-12 border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Users className="h-5 w-5" />
              Polymorphic Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-slate-900">
                  <MessageSquare className="h-4 w-4 text-slate-700" />
                  Article Comments
                </h3>
                <pre className="text-sm bg-white p-4 rounded border border-slate-200 text-slate-700">
                  {`<Comments 
  entity="ARTICLE" 
  entityId={article.id} 
/>`}
                </pre>
                <p className="text-xs text-slate-500 mt-3">
                  Same component, different entity type
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-4 flex items-center gap-2 text-slate-900">
                  <Play className="h-4 w-4 text-slate-700" />
                  Episode Comments
                </h3>
                <pre className="text-sm bg-white p-4 rounded border border-slate-200 text-slate-700">
                  {`<Comments 
  entity="EPISODE" 
  entityId={episode.id} 
/>`}
                </pre>
                <p className="text-xs text-slate-500 mt-3">
                  Identical functionality, different context
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-semibold mb-4 text-slate-900">
                Key Benefits:
              </h4>
              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span className="text-slate-700">
                    Reusable component across all entity types
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span className="text-slate-700">
                    Consistent user experience
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span className="text-slate-700">
                    Easy to maintain and extend
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span className="text-slate-700">
                    Type-safe with TypeScript
                  </span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Code Example */}
        <Card className="mb-12 border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Code className="h-5 w-5" />
              Database Schema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-slate-900 text-emerald-400 p-6 rounded-lg overflow-x-auto text-sm border border-slate-700">
              {`// Polymorphic relationship in Prisma
model Comment {
  id        String        @id @default(cuid())
  entity    CommentEntity // ARTICLE, EPISODE, etc.
  entityId  String        // ID of the specific entity
  userId    String
  text      String
  parentId  String?       // For threaded replies
  
  // Relations
  user      User          @relation(fields: [userId], references: [id])
  parent    Comment?      @relation("CommentThread", fields: [parentId], references: [id])
  replies   Comment[]     @relation("CommentThread")
}

enum CommentEntity {
  ARTICLE
  EPISODE
  // Easy to extend with more types
}`}
            </pre>
          </CardContent>
        </Card>

        {/* Features Showcase */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Users className="h-5 w-5" />
              System Capabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-900">
                  <MessageSquare className="h-5 w-5 text-slate-700" />
                  Universal Integration
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-slate-700">
                      Works with any entity type
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-slate-700">
                      Two props integration
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-slate-700">
                      No code duplication
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-900">
                  <Users className="h-5 w-5 text-slate-700" />
                  Advanced Features
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-slate-700">
                      Server-side rendering
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-slate-700">
                      Real-time updates
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span className="text-slate-700">
                      User permissions
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

export default EpisodePage;
