import { useState } from "react";

const DeleteAccountModal = ({ closeModal }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Delete Account
  const handleDeleteAccount = async () => {
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/delete-account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      alert("Your account has been deleted.");
      window.location.href = "/"; // Redirect to home page after deletion
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Delete Account</h2>
          <button onClick={closeModal} className="text-gray-500 text-2xl">
            &times;
          </button>
        </div>
        <p className="text-gray-700 mb-4">
          To delete your account, enter your password.
        </p>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border  text-orange text-lg rounded p-2 mb-4"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-between">
          <button
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
            onClick={handleDeleteAccount}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
          <button
            className="bg-purple2-500 text-black py-2 px-4 rounded hover:bg-gray-600"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
