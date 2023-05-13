import React, { useEffect, useState } from "react";
import { getConnections } from "../../../api/FirestoreAPIs";
export default function ConnectedUsers({ user, getCurrentUser, currentUser }) {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    getConnections(currentUser.id, user.id, setIsConnected);
  }, [currentUser.id, user.userID]);

  return isConnected ? (
    <></>
  ) : (
    <div
      className="grid-child"
      onClick={() => {
        getCurrentUser(user.id);
      }}
    >
      <p>{user.name}</p>
      <p>{user.headline}</p>
    </div>
  );
}
