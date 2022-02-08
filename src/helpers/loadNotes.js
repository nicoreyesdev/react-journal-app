import { db } from "../firebase/firebase-config"
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const loadNotes = async (uid) =>{
    
    const notesSnap = await getDocs(
        query(collection(db,`${ uid }/journal/notes`), orderBy("date", "desc"))
        );

    const notes = [];

    notesSnap.forEach(snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
      });

    return notes;
}