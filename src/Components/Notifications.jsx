import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/notifications/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold">Notifications</h2>
      <ul>
        {notifications.map((notif) => (
          <li key={notif.id} className="border-b py-2">
            {notif.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
