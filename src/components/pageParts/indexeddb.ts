const DB_NAME = "myDatabase";
const DB_VERSION = 1;
const STORE_NAME = "myObjectStore";

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error("Error opening database");
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const objectStore = db.createObjectStore(STORE_NAME, { keyPath: "id" });
      objectStore.createIndex("emailGiven", "emailGiven", { unique: false });
      objectStore.createIndex("count", "count", { unique: false });
    };
  });
};

export const dbPromise = openDB();
