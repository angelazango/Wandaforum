import api from "../api/axios";

export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });

  // Store authentication token in localStorage
  localStorage.setItem("token", response.data.accessToken);

  // Fetch all notifications for the logged-in user
  const notifications = await getUserNotifications(response.data.userId);

  // Return both user data and notifications
  return { user: response.data, notifications };
};

export const getUserNotifications = async (userId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("User is not authenticated");
  }

  // Fetch all types of notifications for the user
  const response = await api.get(`/notifications/all/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
