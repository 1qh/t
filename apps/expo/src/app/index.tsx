import { useState } from 'react'
import { Button, Pressable, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, Stack } from 'expo-router'
import { FlashList } from '@shopify/flash-list'

import type { RouterOutputs } from '~/utils/api'
import { api } from '~/utils/api'
import { useSignIn, useSignOut, useUser } from '~/utils/auth'

const PostCard = (props: { post: RouterOutputs['post']['all'][number]; onDelete: () => void }) => (
  <View className='flex flex-row rounded-2xl bg-muted p-4'>
    <View className='grow'>
      <Link
        asChild
        href={{
          pathname: '/post/[id]',
          params: { id: props.post.id }
        }}>
        <Pressable className=''>
          <Text className='text-xl font-semibold text-primary'>{props.post.title}</Text>
          <Text className='mt-2 text-foreground'>{props.post.content}</Text>
        </Pressable>
      </Link>
    </View>
    <Pressable onPress={props.onDelete}>
      <Text className='font-bold uppercase text-primary'>Delete</Text>
    </Pressable>
  </View>
)

function CreatePost() {
  const utils = api.useUtils()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const { mutate, error } = api.post.create.useMutation({
    async onSuccess() {
      setTitle('')
      setContent('')
      await utils.post.all.invalidate()
    }
  })
  return (
    <View className='flex gap-2'>
      <TextInput
        className='items-center rounded-xl border border-input bg-background p-3 text-lg leading-tight text-foreground'
        value={title}
        onChangeText={setTitle}
        placeholder='Title'
      />
      {error?.data?.zodError?.fieldErrors.title && (
        <Text className='mb-2 text-destructive'>{error.data.zodError.fieldErrors.title}</Text>
      )}
      <TextInput
        className='items-center rounded-xl border border-input bg-background p-3 text-lg leading-tight text-foreground'
        value={content}
        onChangeText={setContent}
        placeholder='Content'
      />
      {error?.data?.zodError?.fieldErrors.content && (
        <Text className='mb-2 text-destructive'>{error.data.zodError.fieldErrors.content}</Text>
      )}
      <Pressable
        className='flex items-center rounded-xl bg-primary py-4'
        onPress={() => mutate({ title, content })}>
        <Text className='text-background'>Create</Text>
      </Pressable>
      {error?.data?.code === 'UNAUTHORIZED' && (
        <Text className='mt-2 text-destructive'>You need to be logged in to create a post</Text>
      )}
    </View>
  )
}

function MobileAuth() {
  const user = useUser()
  const signIn = useSignIn()
  const signOut = useSignOut()
  return (
    <>
      <Text className='pb-2 text-center text-foreground'>{user?.name ?? 'Not logged in'}</Text>
      <Button
        onPress={() => (user ? signOut() : signIn())}
        title={user ? 'Sign Out' : 'Sign In With Google'}
      />
    </>
  )
}

export default function Index() {
  const utils = api.useUtils()
  const postQuery = api.post.all.useQuery()
  const deletePostMutation = api.post.delete.useMutation({
    onSettled: () => utils.post.all.invalidate()
  })
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: 'Home Page' }} />
      <View className='size-full px-1'>
        <CreatePost />

        <View className='py-2'>
          <Text className='font-semibold italic text-primary'>Press on a post</Text>
        </View>

        <FlashList
          data={postQuery.data}
          estimatedItemSize={20}
          ItemSeparatorComponent={() => <View className='h-2' />}
          renderItem={p => (
            <PostCard post={p.item} onDelete={() => deletePostMutation.mutate(p.item.id)} />
          )}
        />
        <MobileAuth />
      </View>
    </SafeAreaView>
  )
}
