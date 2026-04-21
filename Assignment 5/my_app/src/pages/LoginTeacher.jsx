export default function LoginTeacher() {
  const handleLogin = (e) => {
    e.preventDefault();
    alert("Teacher Logged In!");
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Teacher Login</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
        <input type="email" placeholder="Teacher Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}