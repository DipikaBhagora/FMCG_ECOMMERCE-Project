import React, { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";

export const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [expandedMsgId, setExpandedMsgId] = useState(null);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("/messages/vendor-inbox"); // Adjust the endpoint as needed
      setMessages(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      toast.error("Unable to load messages");
    }
  };

  const toggleExpand = (id) => {
    setExpandedMsgId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Inbox</h2>

        {messages.length === 0 ? (
          <div className="text-center text-gray-600 mt-12">
            <p>No messages yet. Stay tuned!</p>
          </div>
        ) : (
          <ul className="space-y-6">
            {messages.map((msg) => (
              <li
                key={msg._id}
                className={`flex flex-col p-6 border border-gray-300 rounded-xl shadow-sm transition duration-300 transform hover:scale-105 cursor-pointer ${
                  !msg.read ? "bg-blue-50" : "bg-white"
                }`}
                onClick={() => toggleExpand(msg._id)}
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="text-xl font-medium text-gray-800">{msg.userId?.name || "Unknown User"}</h4>
                    <p className="text-sm text-gray-500">{msg.userId?.email || "No Email Provided"}</p>
                  </div>
                  <p className="text-sm text-gray-400">{formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}</p>
                </div>

                <div className="mb-2">
                  <p className="text-gray-700 text-base leading-relaxed line-clamp-2">
                    {expandedMsgId === msg._id ? msg.message : msg.message.slice(0, 100) + "..."}
                  </p>
                </div>

                {expandedMsgId === msg._id && (
                  <div className="mt-4 text-sm text-gray-600">
                    <div>
                      <strong>Phone:</strong> {msg.userId?.phone || "N/A"}
                    </div>
                    <div>
                      <strong>Address:</strong> {msg.userId?.address || "No Address Provided"}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
