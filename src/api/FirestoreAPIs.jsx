import { firestore } from "../firebaseConfig";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";

let dbRef = collection(firestore, "posts");
export const postStatus = (status) => {
  let object = {
    status: status,
  };
  addDoc(dbRef, object)
    .then((res) => {
      toast.success("Document has been added Successfully!");
    })
    .catch((err) => {
      toast.error(err.message);
    });
};

export const getStatus = (setAllStatus) => {
  onSnapshot(dbRef, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};
