import { auth, signIn, signOut } from '@a/auth'
import { Button } from '@a/ui/button'

export async function Login() {
  const session = await auth()
  return session ? (
    <form>
      <Button
        variant='destructive'
        formAction={async () => {
          'use server'
          await signOut()
        }}>
        Log out
      </Button>
      <pre>{JSON.stringify(session, null, 4)}</pre>
    </form>
  ) : (
    <form>
      <Button
        formAction={async () => {
          'use server'
          await signIn('google')
        }}>
        Google log in
      </Button>
    </form>
  )
}
