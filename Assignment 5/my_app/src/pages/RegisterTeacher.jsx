import { useNavigate } from 'react-router-dom';

export default function RegisterTeacher() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Backend API call would go here
    alert("Teacher Registered Successfully!");
    navigate('/login-teacher'); 
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Teacher Registration</h2>
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Teacher Email" required />
        <input type="text" placeholder="Subject Expert In" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register as Teacher</button>
      </form>
    </div>
  );
}