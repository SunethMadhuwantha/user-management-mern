import React, { useState, useEffect, useRef } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import User from "../Adduser/User";
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:5000/users";

// Fetch users from the server
const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    console.log("API Response:", response.data);
    return response.data; // Adjusted to match backend response structure
  } catch (error) {
    console.error("Error fetching users:", error);
    return { Users: [] }; // Return an empty array if the response fails
  }
};

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]); // Save original users
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const componentsRef = useRef();

  // Fetch users when the component mounts
  useEffect(() => {
    fetchHandler().then((data) => {
      console.log("Fetched users:", data.Users);
      setUsers(data.Users || []);
      setAllUsers(data.Users || []); // Save a copy of the original list
    });
  }, []);

  // Handle deleting a user
  const handleDeleteUser = (_id) => {
    axios
      .delete(`http://localhost:5000/users/${_id}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== _id));
        setAllUsers((prevUsers) => prevUsers.filter((user) => user._id !== _id));
        alert("User deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      });
  };

  // Handle search functionality
  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      // Reset to original user list if search query is empty
      setUsers(allUsers);
      setNoResults(false);
      return;
    }

    const filteredUsers = allUsers.filter((user) =>
      Object.values(user).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    setUsers(filteredUsers);
    setNoResults(filteredUsers.length === 0);
  };

  //send whatsapp msg
  const handleSendReport = ()=>{
    const phoneNumber = "+94713737040";
    const message = `user reports`
    const WhatsAppUrl = `https:web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent}(
    message )}`;

    window.open(WhatsAppUrl,"_blank");
  }
  
   


  // Download document (printing functionality)
  const handlePrint = useReactToPrint({
    contentRef: componentsRef,
    documentTitle: "USER DETAILS",
    onAfterPrint: () => {
      alert("Printing is done!");
    },
    removeAfterPrint: true,
  });

  return (
    <div>
      <Nav />
      <div>
        <h1>User Details...</h1>
      </div>

      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search User Details"
      />
      <button onClick={handleSearch}>SEARCH</button>
      {noResults ? (
        <div>
          <p>No results found for "{searchQuery}"</p>
        </div>
      ) : (
        <div ref={componentsRef}>
          {users && users.length > 0 ? (
            users.map((user, i) => (
              <div key={i}>
                <User user={user} onDelete={handleDeleteUser} />
              </div>
            ))
          ) : (
            <p>No users available to display</p>
          )}
        </div>
      )}
      <button onClick={handlePrint} disabled={users.length === 0}>
        DOWNLOAD DOCUMENT
      </button>
      <br></br>
      <button onClick={handleSendReport}>SEND WHATSAPP</button>
    </div>
  );
}

export default UserDetails;
