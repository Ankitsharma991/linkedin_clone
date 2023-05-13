import React, { useEffect, useState } from "react";
import {
  getAllUsers,
  addConnection,
} from "../../api/FirestoreAPIs";
import "../../Sass/ConnectionsComponent.scss";
import ConnectedUsers from "./ConnectedUsers";

export const ConnectionsComponent = ({ currentUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  const getCurrentUser = (id) => {
    addConnection(currentUser.id, id);
  };

  return (
    <div className="connections-main">
      {users.map((user) => {
        return user.id === currentUser.id ? (
          <></>
        ) : (
          <ConnectedUsers
            currentUser={currentUser}
            user={user}
            getCurrentUser={getCurrentUser}
          />
        );
      })}
    </div>
  );
};
