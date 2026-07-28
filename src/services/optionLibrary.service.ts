import type { IOptionLibrary } from '@/core/interfaces/model/optionLibrary'
import { getHashingMD5 } from '@/core/utils/common'
import { db } from '@/plugins/firebase'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  type QueryDocumentSnapshot,
  type DocumentData
} from 'firebase/firestore'

const COLLECTION = 'optionLibrary'
export const OPTION_LIBRARY_PAGE_SIZE = 20

/** Dedup source: trimmed link, or trimmed title when link is empty. */
export const getOptionLibrarySource = (title: string, link: string): string => {
  const trimmedLink = (link || '').trim()
  if (trimmedLink) return trimmedLink
  return (title || '').trim()
}

export const buildOptionLibraryKey = (title: string, link: string): string => {
  return getHashingMD5(getOptionLibrarySource(title, link))
}

/**
 * Upsert library item when an option is added to a topic.
 * Doc id is the hashed key (never raw title/link).
 */
export const upsertOptionLibrary = async (
  title: string,
  link: string,
  thumbnail?: string | null
): Promise<void> => {
  const source = getOptionLibrarySource(title, link)
  if (!source) return

  const key = buildOptionLibraryKey(title, link)
  await setDoc(
    doc(db, COLLECTION, key),
    {
      key,
      title: (title || '').trim(),
      link: (link || '').trim(),
      thumbnail: thumbnail || '',
      updatedAt: new Date()
    },
    { merge: true }
  )
}

export type OptionLibraryPage = {
  items: IOptionLibrary[]
  lastDoc: QueryDocumentSnapshot<DocumentData> | null
  hasMore: boolean
}

export const getOptionLibraryPage = async (
  pageSize: number = OPTION_LIBRARY_PAGE_SIZE,
  cursor?: QueryDocumentSnapshot<DocumentData> | null
): Promise<OptionLibraryPage> => {
  const q = cursor
    ? query(
        collection(db, COLLECTION),
        orderBy('updatedAt', 'desc'),
        startAfter(cursor),
        limit(pageSize)
      )
    : query(collection(db, COLLECTION), orderBy('updatedAt', 'desc'), limit(pageSize))

  const snapshot = await getDocs(q)
  const items = snapshot.docs.map((d) => {
    const data = d.data()
    return {
      id: d.id,
      key: data.key as string,
      title: (data.title as string) || '',
      link: (data.link as string) || '',
      thumbnail: (data.thumbnail as string) || '',
      updatedAt: data.updatedAt?.toDate?.() ?? new Date()
    } as IOptionLibrary
  })

  return {
    items,
    lastDoc: snapshot.docs.length ? snapshot.docs[snapshot.docs.length - 1] : null,
    hasMore: snapshot.docs.length === pageSize
  }
}

export const deleteOptionLibrary = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, COLLECTION, id))
}
