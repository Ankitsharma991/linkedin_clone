import { firestore } from "../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  where,
  query

} from "firebase/firestore";
import { toast } from "react-toastify";

let postsRef = collection(firestore, "posts");
let userRef = collection(firestore, "users");

export const postStatus = (object) => {
  addDoc(postsRef, object)
    .then(() => {
      toast.success("Post has been added Successfully!");
    })
    .catch((err) => {
      toast.error(err.message);
    });
};

export const getStatus = (setAllStatus) => {
  onSnapshot(postsRef, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const postUserData = (object) => {
  addDoc(userRef, object)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const getCurrentUser = (setCurrentUser) => {
  onSnapshot(userRef, (response) => {
    setCurrentUser(
      response.docs
        .map((docs) => {
          return { ...docs.data(), id: docs.id };
        })
        .filter((item) => {
          return item.email === localStorage.getItem("userEmail");
        })[0]
    );
  });
};

export const editProfile = (userID, payLoad) => {
  let userToEdit = doc(userRef, userID);
  updateDoc(userToEdit, payLoad)
    .then(() => {
      toast.success("Profile has been updated successfully");
    })
    .catch((err) => {
      toast.error(err.message);
      // console.log(err);
    });
};

export const getSingleStatus = (setAllStatus, id) => {
  // alert(id)
  const singlePostQuery = query(postsRef, where("userId", "==", id));
  onSnapshot(singlePostQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getSingleUser = (setCurrentUser, email) => {
  // alert(email)
  const singleUserQuery = query(userRef, where("email", "==", email));
  onSnapshot(singleUserQuery, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })[0]
    );
  });
};
