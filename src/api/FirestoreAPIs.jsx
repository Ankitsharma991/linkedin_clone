import { firestore } from "../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  where,
  query,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

let postsRef = collection(firestore, "posts");
let userRef = collection(firestore, "users");
let likeRef = collection(firestore, "likes");
let commentRef = collection(firestore, "comments");

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
  const singlePostQuery = query(postsRef, where("userID", "==", id));
  // console.log(singlePostQuery);
  // alert(singlePostQuery);
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
  // alert(singleUserQuery);
  // console.log(singleUserQuery);
  onSnapshot(singleUserQuery, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })[0]
    );
  });
};

export const likePost = (userId, postId, liked) => {
  try {
    let docToLike = doc(likeRef, `${userId}_${postId}`);
    if (liked) {
      deleteDoc(docToLike);
    } else {
      setDoc(docToLike, { userId, postId });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getLikesByUser = (userId, postId, setLiked, setLikesCount) => {
  try {
    let likeQuery = query(likeRef, where("postId", "==", postId));
    onSnapshot(likeQuery, (response) => {
      let likes = response.docs.map((doc) => doc.data());
      let likeCount = likes.length;

      const isLiked = likes.some((like) => like.userId === userId);
      setLikesCount(likeCount);
      setLiked(isLiked);
    });
  } catch (err) {
    console.log(err);
  }
};

export const postComment = (postId, comment, timestamp, name) => {
  try {
    addDoc(commentRef, {
      postId,
      comment,
      timestamp,
      name,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getComments = (postId, setComments) => {
  try {
    let singlePostQuery = query(commentRef, where("postId", "==", postId));
    onSnapshot(singlePostQuery, (response) => {
      const comments = response.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setComments(comments);
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllUsers = (setAllUsers) => {
  onSnapshot(userRef, (response) => {
    setAllUsers(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const updatePost = (id, status) => {
  let docToUpdate = doc(postsRef, id);
  try {
    updateDoc(docToUpdate, { status });
    toast.success("Post has been updated!!");
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
};

export const deletePost = (id) => {
  let docToDelete = doc(postsRef, id);
  try {
    deleteDoc(docToDelete);
    toast.success("Post has been Deleted!!");
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
};
