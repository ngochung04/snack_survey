import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as fbSignOut } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '@/plugins/firebase'
import type { IUser } from '@/core/interfaces/model/user'
import { getAccountByEmail } from './account.service'

export const signIn = async (email: string, password: string): Promise<IUser | null> => {
  const credential = await signInWithEmailAndPassword(auth, email, password)
  const user = credential.user
  const account = await getAccountByEmail(user.email ?? email)
  return account
}

export const signUp = async (username: string, email: string, password: string): Promise<IUser | null> => {
  const credential = await createUserWithEmailAndPassword(auth, email, password)
  const uid = credential.user.uid
  const account: IUser = {
    id: uid,
    username,
    email,
    avatar: '',
    team: ''
  }
  await setDoc(doc(db, 'accounts', uid), account)
  return account
}

export const signOut = async (): Promise<void> => {
  await fbSignOut(auth)
}

export const getCurrentAuthUser = () => auth.currentUser
