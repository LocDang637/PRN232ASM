
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa token và user khỏi localStorage
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');

    // Chuyển hướng về trang login
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} style={{ padding: '8px 12px', background: 'red', color: 'white', border: 'none', borderRadius: '4px' }}>
      Đăng xuất
    </button>
  );
}

export default LogoutButton;