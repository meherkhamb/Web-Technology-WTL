import { Link } from 'react-router-dom';
import './Navbar.css';


export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>School Portal</h2>
      <ul style={styles.ul}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/register-student" style={styles.link}>Student Reg.</Link></li>
        <li><Link to="/register-teacher" style={styles.link}>Teacher Reg.</Link></li>
        <li><Link to="/login-student" style={styles.link}>Student Login</Link></li>
        <li><Link to="/login-teacher" style={styles.link}>Teacher Login</Link></li>
      </ul>
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#333', color: 'white' },
  ul: { display: 'flex', listStyle: 'none', gap: '15px' },
  link: { color: 'white', textDecoration: 'none' }
};