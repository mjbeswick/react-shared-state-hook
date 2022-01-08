import { MutableRefObject } from 'react'

export type SharedRef<T> = () => MutableRefObject<T | undefined>;

export function createSharedRef<T> (initialValue?: T): SharedRef<T> {
  const referenceObj: MutableRefObject<T | undefined> = {
    current: initialValue
  }

  return () => referenceObj
}
