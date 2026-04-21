import { useNavigate } from 'react-router-dom';

export default function RegisterStudent() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Here you would normally send data to your backend database
    alert("Student Registered Successfully!");
    navigate('/login-student'); // Redirect to login
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Student Registration</h2>
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Student Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register as Student</button>
      </form>
    </div>
  );
}