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
  const q = query(collection(db, "employees"), orderBy("createdAt", "asc"));
  return onSnapshot(q, (snapshot) => {
    const employees = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(employees);
  });
};

// ✅ Add Employee to data base
export const addEmployee = async (data) => {
  try {
    await addDoc(collection(db, "employees"), { data, createdAt: serverTimestamp() })
    console.log("Employee added");
  } catch (error) {
    console.error("Error adding Employee:", error);
  }
  return data
}

// ✅ Update Employee
export const updateEmployee = async ({ id, data }) => {
  const employeeRef = doc(db, "employees", id)
  const employeeSnap = await getDoc(employeeRef);
  if (employeeSnap.exists()) {
    const { createdAt } = employeeSnap.data(); // Extract the existing `createdAt`
    await updateDoc(employeeRef, { data, createdAt }); // Preserve `createdAt` while updating other fields
  } else {
    console.error("Employee not found");
  }
}

// ✅ Delete Employee
export const deleteEmployee = async (id) => {
  await deleteDoc(doc(db, "employees", id))
}

// ✅ Get Employee by id
export const getEmployeeById = async (id) => {
  try {
    const employeeRef = doc(db, "employees", id);
    const employeeSnap = await getDoc(employeeRef);
    return employeeSnap.data()
  } catch (error) {
    console.error("Error message", error);
  }
}