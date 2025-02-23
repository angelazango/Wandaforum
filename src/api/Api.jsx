import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Change to your actual backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// Login function that also fetches notifications
export const login = async (email, password) => {
    try {
      // Send login request to the backend
      const response = await api.post("/auth/login", { email, password });
  
      // Store token in local storage for future use
      localStorage.setItem("token", response.data.accessToken);
  
      // Notifications are already included in the response, so we just return them
      return { user: response.data.user, notifications: response.data.notifications };
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  
  // Function to fetch all notifications for the logged-in user
  export const getUserNotifications = async (userId) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      throw new Error("User is not authenticated");
    }
  
    try {
      const response = await api.get(`/notifications/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return [];
    }
  };


  //=====
  const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
  
    useEffect(() => {
      // Fetch notifications from the backend
      axios.get('/api/notifications')
        .then(response => setNotifications(response.data))
        .catch(err => console.error('Error fetching notifications:', err));
    }, []);
  
    const handleMarkAsRead = async (id) => {
      try {
        await axios.post(`/api/notifications/${id}/mark-as-read`);
        setNotifications(notifications.map((notif) =>
          notif.id === id ? { ...notif, isRead: true } : notif
        ));
      } catch (err) {
        console.error('Error marking as read:', err);
      }
    };
  
    return (
      <div className="notifications-list">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`notification-item ${notif.isRead ? 'read' : 'unread'}`}
          >
            <p>{notif.message}</p>
            <a href={notif.link} target="_blank" rel="noopener noreferrer">View</a>
            <button onClick={() => handleMarkAsRead(notif.id)}>Mark as Read</button>
          </div>
        ))}
      </div>
    );
  };
  
export default api;
