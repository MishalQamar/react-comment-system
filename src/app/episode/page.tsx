import PageNav from '@/components/page-nav';
import { Comments } from '@/features/comments/components/comments';

import { getEpisode } from '@/features/episode/queries/getEpisode';
import { Suspense } from 'react';

const EpisodePage = async () => {
  const episode = await getEpisode();

  if (!episode) {
    return null;
  }

  return (
    <div className="h-screen ">
      <PageNav />
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <h3 className="text-base font-semibold text-gray-900">
          Episode Comments
        </h3>
      </div>
      <Suspense fallback={<div>Loading comments...</div>}>
        <Comments entity="EPISODE" entityId={episode.id} />
      </Suspense>
    </div>
  );
};
export default EpisodePage;
