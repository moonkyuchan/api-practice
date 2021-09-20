import React, { useState, useEffect } from "react";
import axios from "axios";

const User = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setError(null);
      setUser(null);
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUser(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 !!</div>;
  if (!user) return null;
  return (
    <>
      <ul>
        {user.map((data) => (
          <li key={data.id}>
            {data.username} ({data.name})
          </li>
        ))}
      </ul>
      <input type="button" value="다시불러오기" onClick={fetchUsers} />
    </>
  );
};

export default User;
