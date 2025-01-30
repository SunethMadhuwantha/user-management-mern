import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateUser() {
    const [inputs, setInputs] = useState({});
    const [loading, setLoading] = useState(true);
    const history = useNavigate();
    const { id } = useParams();

    console.log("Fetched ID:", id); // Debugging ID

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/users/${id}`);
                console.log("Fetched data:", res.data); // Log the fetched data

                // Adjust the response to reflect the correct structure
                if (res.data && res.data.Users) {
                    setInputs(res.data.Users); // Corrected to 'Users' instead of 'user'
                } else {
                    console.error("Data structure not as expected:", res.data);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setLoading(false);
            }
        };

        fetchHandler();
    }, [id]);

    const sendRequest = async () => {
        try {
            await axios.put(`http://localhost:5000/users/${id}`, {
                name: inputs.name,
                gmail: inputs.gmail, // Correcting email field name to 'gmail'
                age: inputs.age,
                address: inputs.address,
            });
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history('/userdetails'));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Update user</h1>

            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <br />
                <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={inputs.name || ''}
                    required
                />
                <br />
                <br />
                <label>Gmail</label>
                <br />
                <input
                    type="text"
                    name="gmail"
                    onChange={handleChange}
                    value={inputs.gmail || ''}
                    required
                />
                <br />
                <br />
                <label>Age</label>
                <br />
                <input
                    type="text"
                    name="age"
                    onChange={handleChange}
                    value={inputs.age || ''}
                    required
                />
                <br />
                <br />
                <label>Address</label>
                <br />
                <input
                    type="text"
                    name="address"
                    onChange={handleChange}
                    value={inputs.address || ''}
                    required
                />
                <br />
                <br />
                <button className="lk">Submit</button>
            </form>
        </div>
    );
}

export default UpdateUser;
