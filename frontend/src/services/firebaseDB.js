// firebaseDB.js

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, onSnapshot, getDoc, serverTimestamp, query, orderBy } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);



// ✅ get Employees from data base
export const getEmployees = async () => {
  const q = query(collection(db, "employees"), orderBy("createdAt", "asc"));
  const querySnapshot = await getDocs(q);
  const employees = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  return employees
}
// update realtime data base
export const subscribeToEmployee = (callback) => {
  const q = query(collection(db, "employees"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const employees = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(employees);
  });
};

// ✅ Add Employe to data base
export const addEmploye = async (data) => {
  try {
    await addDoc(collection(db, "employees"), { data, createdAt: serverTimestamp() })
    console.log("Employe added");
  } catch (error) {
    console.error("Error adding Employe:", error);
  }
  return data
}

// ✅ Update Employe
export const updateEmploye = async ({ id, data }) => {
  const employeRef = doc(db, "employees", id)
  await updateDoc(employeRef, { data })
}

// ✅ Delete Employe
export const deleteEmploye = async (id) => {
  await deleteDoc(doc(db, "employees", id))
}

// ✅ Get Employe by id
export const getEmployeById = async (id) => {
  try {
    const employeRef = doc(db, "employees", id);
    const employeSnap = await getDoc(employeRef);
    return employeSnap.data()
  } catch (error) {
    console.error("Error message", error);
  }
}