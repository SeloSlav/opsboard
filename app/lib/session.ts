import { auth } from './auth';

export async function getSessionUser() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('UNAUTHENTICATED');
  }
  return session.user;
}