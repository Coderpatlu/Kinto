import React, { useState } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setError] = useState({});
  const [success, setSuccess] = useState("");

  const validate = (values) => {
    const errs = {};

    if (!values.name.trim()) errs.name = "Name is required";

    if (!values.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errs.email = "Email is invalid";
    }

    if (!values.password) {
      errs.password = "Password is required";
    } else if (values.password.length < 8) {
      errs.password = "Password must be at least 8 characters";
    }

    if (values.confirmPassword !== values.password) {
      errs.confirmPassword = "Passwords do not match";
    }

    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" }));
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v = validate(form);
    setError(v);

    // *Fix: Continue only if there are NO errors*
    if (Object.keys(v).length !== 0) return;

    try {
      const res = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError({ server: data.message || "Something went wrong" });
        return;
      }

      setSuccess("Signup successful!");
      setForm(initialState);
    } catch (error) {
      setError({ server: "Network error, please try again." });
    }
  };

  return (
    <section>
      <h2>Create Your Account</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          {errors.name && <small>{errors.name}</small>}
        </div>

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <small>{errors.email}</small>}
        </div>

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {errors.password && <small>{errors.password}</small>}
        </div>

        <div>
          <label>Confirm Password</label>
          <br />
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <small>{errors.confirmPassword}</small>}
        </div>

        <button type="submit" style={{ marginTop: 10 }}>
          Sign Up
        </button>
      </form>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {errors.server && <p style={{ color: "red" }}>{errors.server}</p>}
    </section>
  );
};

export default Signup;
