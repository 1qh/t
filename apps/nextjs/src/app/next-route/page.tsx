import { Suspense } from 'react'

import { Login } from '~/app/login'
import { api } from '~/trpc/server'
import { CreatePostForm, PostCardSkeleton, PostList } from './posts'

export const runtime = 'edge'

export default function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below
  const posts = api.post.all()
  return (
    <div className='p-3'>
      <Login />
      <CreatePostForm />
      <Suspense
        fallback={
          <>
            <PostCardSkeleton />
            <PostCardSkeleton />
            <PostCardSkeleton />
          </>
        }>
        <PostList posts={posts} />
      </Suspense>
    </div>
  )
}
