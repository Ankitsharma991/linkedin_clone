import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ConnectionsComponent } from "../components/common/ConnectionsComponent";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { Loader } from "../components/common/Loader/Loader";

const Connections = ({ currentUser }) => {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate("/");
      } else {
        setLoading(false);
      }
    });
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <ConnectionsComponent currentUser={currentUser} />
  );
};

export default Connections;
