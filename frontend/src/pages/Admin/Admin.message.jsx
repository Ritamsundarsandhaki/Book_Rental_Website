import React, { useState } from "react";
import { FiSearch, FiPaperclip, FiEdit, FiTrash } from "react-icons/fi";
import { FaUser, FaStore } from "react-icons/fa";

const users = [
  { id: 1, name: "John Doe", type: "user" },
  { id: 2, name: "Jane Smith", type: "user" },
];

const shopkeepers = [
  { id: 3, name: "Shop A", type: "shopkeeper" },
  { id: 4, name: "Shop B", type: "shopkeeper" },
];

const AdminChat = () => {
  const [activeTab, setActiveTab] = useState("user");
  const [search, setSearch] = useState("");
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [inputMessage, setInputMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const filteredContacts = (activeTab === "user" ? users : shopkeepers).filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  const sendMessage = () => {
    if (!activeChat || (inputMessage.trim() === "" && !selectedFile)) return;

    setMessages((prev) => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), { sender: "admin", text: inputMessage, file: selectedFile }],
    }));
    setInputMessage("");
    setSelectedFile(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setInputMessage(file ? file.name : "");
  };

  const deleteMessage = (chatId, index) => {
    setMessages((prev) => ({
      ...prev,
      [chatId]: prev[chatId].filter((_, i) => i !== index),
    }));
  };

  const startEditing = (chatId, index) => {
    setEditingIndex(index);
    setInputMessage(messages[chatId][index].text);
  };

  const editMessage = (chatId) => {
    if (editingIndex === null) return;

    setMessages((prev) => {
      const updatedMessages = [...prev[chatId]];
      updatedMessages[editingIndex].text = inputMessage;
      return { ...prev, [chatId]: updatedMessages };
    });
    setEditingIndex(null);
    setInputMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-100 desktop:max-h-[95vh]">
      {/* Sidebar */}
      <div className="w-1/3 bg-white p-4 border-2 rounded-2xl m-2">
        <div className="flex justify-between mb-4">
          <button
            className={`p-2 text-lg font-semibold ${activeTab === "user" ? "text-blue-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("user")}
          >
            <FaUser className="inline mr-2" /> Users
          </button>
          <button
            className={`p-2 text-lg font-semibold ${activeTab === "shopkeeper" ? "text-blue-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("shopkeeper")}
          >
            <FaStore className="inline mr-2" /> Shopkeepers
          </button>
        </div>
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 p-2 w-full border rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-3 rounded-lg cursor-pointer ${activeChat?.id === contact.id ? "bg-blue-500 text-white" : "hover:bg-gray-200 "}`}
              onClick={() => setActiveChat(contact)}
            >
              {contact.name}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="w-2/3 flex flex-col border-2 rounded-2xl overflow-hidden desktop:max-h-[95vh]">
        {activeChat ? (
          <>
            <div className="bg-white p-4 border-b flex items-center ">
              <h2 className="text-xl font-semibold">{activeChat.name}</h2>
            </div>
            <div className="flex-1 p-4 overflow-auto bg-gray-200 ">
              {(messages[activeChat.id] || []).map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 max-w-xs rounded-lg flex items-center justify-between ${msg.sender === "admin" ? "bg-blue-500 text-white ml-auto" : "bg-gray-300"}`}
                >
                  <div>
                    {msg.text}
                    {msg.file && (
                      <div className="mt-2 text-sm text-gray-700">
                        <a href={URL.createObjectURL(msg.file)} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                          {msg.file.name}
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="ml-2 flex space-x-2">
                    <FiEdit className="cursor-pointer" onClick={() => startEditing(activeChat.id, index)} />
                    <FiTrash className="cursor-pointer text-red-600" onClick={() => deleteMessage(activeChat.id, index)} />
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-white border-t flex items-center">
              <label htmlFor="fileInput" className="cursor-pointer mr-2">
                <FiPaperclip className="text-gray-600 text-xl" />
              </label>
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileChange}
              />
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              {editingIndex !== null ? (
                <button className="ml-2 bg-yellow-500 text-white px-4 py-2 rounded-lg" onClick={() => editMessage(activeChat.id)}>
                  Edit
                </button>
              ) : (
                <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={sendMessage}>
                  Send
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 text-gray-500">Select a conversation to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
