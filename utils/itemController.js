import { firestore } from '../app/firebase'
import {
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from 'firebase/firestore'

export const addItem = async ({ name, quantity, category }) => {
  const docRef = doc(collection(firestore, 'inventory'), name.toLowerCase())
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const { quantity: currentQuantity } = docSnap.data()
    await updateDoc(docRef, { quantity: currentQuantity + quantity, category })
  } else {
    await setDoc(docRef, { name, quantity, category })
  }
}

export const updateItem = async (oldName, newItem) => {
  const oldDocRef = doc(collection(firestore, 'inventory'), oldName.toLowerCase())
  const newDocRef = doc(collection(firestore, 'inventory'), newItem.name.toLowerCase())

  if (oldName.toLowerCase() !== newItem.name.toLowerCase()) {
    // If the name has changed, delete the old document and create a new one
    await deleteDoc(oldDocRef)
    await setDoc(newDocRef, { name: newItem.name, quantity: newItem.quantity, category: newItem.category })
  } else {
    // If only the quantity has changed, update the existing document
    await updateDoc(oldDocRef, { quantity: newItem.quantity, category: newItem.category })
  }
}

export const removeItem = async (item) => {
  const docRef = doc(collection(firestore, 'inventory'), item.toLowerCase())
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    const { quantity } = docSnap.data()
    if (quantity === 1) {
      await deleteDoc(docRef)
    } else {
      await updateDoc(docRef, { quantity: quantity - 1 })
    }
  }
}