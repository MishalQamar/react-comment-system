import PageNav from '@/components/page-nav';
import { getArticle } from '@/features/article/queries/getArticle';

import { Comments } from '@/features/comments/components/comments';
import { Suspense } from 'react';

const ArticlePage = async () => {
  const article = await getArticle();

  if (!article) {
    return null;
  }

  return (
    <div className="h-screen ">
      <PageNav />
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <h3 className="text-base font-semibold text-gray-900">
          Article Comments
        </h3>
      </div>

      <Suspense fallback={<div>Loading comments...</div>}>
        <Comments entity="ARTICLE" entityId={article.id} />
      </Suspense>
    </div>
  );
};
export default ArticlePage;
