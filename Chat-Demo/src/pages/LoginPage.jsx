import React, { useState } from 'react';
import GoogleLogin from '../components/GoogleLogin';
import '../assets/css/main.css';
import '../assets/css/util.css';
import Picture from '../assets/images/img-01.png';
import { loginWithEmail } from '../api/loginApi'
import { useNavigate } from 'react-router-dom';
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
  e.preventDefault();
  try {
    const data = await loginWithEmail(email, password);
    localStorage.setItem("jwt", data.token);
    console.log("Đăng nhập thành công:", data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
    navigate('/chat') 
  } catch (err) {
    alert(err.message);
  }
};



  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src={Picture} alt="IMG" />
          </div>

          <form className="login100-form validate-form" onSubmit={handleFormSubmit}>
            <span className="login100-form-title">Member Login</span>

            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
              <input
                className="input100"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div className="wrap-input100 validate-input" data-validate="Password is required">
              <input
                className="input100"
                type="password"
                name="pass"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button type="submit" className="login100-form-btn">Login</button>
            </div>

            <div className="text-center p-t-12">
              <span className="txt1">Forgot </span>
              <a className="txt2" href="#">Username / Password?</a>
            </div>

            <div className="text-center p-t-136">
              <a className="txt2" href="#">
                Create your Account
                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
              </a>
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <GoogleLogin />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;


// import React, { useState } from 'react';
// import GoogleLogin from '../components/GoogleLogin';

// function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     // TODO: Xử lý đăng nhập bằng tài khoản và mật khẩu ở đây
//     console.log('Login with:', email, password);
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
//       <h2>Đăng nhập</h2>
//       <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Mật khẩu"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Đăng nhập</button>
//       </form>

//       <hr style={{ margin: '2rem 0' }} />
//       <GoogleLogin />
//     </div>
//   );
// }

// export default LoginPage;
