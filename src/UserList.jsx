import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  // 데이터 불러오기
  const loadUsers = async () => {
    const res = await axios.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // 새 유저 추가
  const addUser = async (e) => {
    e.preventDefault();
    await axios.post("/users", form);
    setForm({ name: "", email: "" });
    loadUsers();
  };

  // 유저 삭제
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await axios.delete(`/users/${id}`);
    loadUsers();
  };

  return (
    <div className="container mt-4">
      <h2>User List</h2>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <a href={`/edit/${u.id}`} className="btn btn-sm btn-warning">Edit</a>{" "}
                <button onClick={() => deleteUser(u.id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New User</h3>
      <form onSubmit={addUser} className="row g-3">
        <div className="col-md-5">
          <input
            type="text"
            placeholder="Name"
            className="form-control"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="col-md-5">
          <input
            type="email"
            placeholder="Email"
            className="form-control"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-success w-100">Add</button>
        </div>
      </form>
    </div>
  );
}
