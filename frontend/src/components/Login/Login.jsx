import {React, useState, useContext} from 'react';
import AuthContext from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);
  const {setIsLoggedIn} = useContext(AuthContext);
  const {setUserId} = useContext(AuthContext);
  const {setUserName} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email : email,
          password : password,
        }),
      });

      if (response.ok) {
        const responseData = await response.json(); // Parse the JSON response
        const userId = responseData.data.user._id;
        const username = responseData.data.user.username;
        setLoginStatus('success');
        setIsLoggedIn(true)
        setUserId(userId)
        setUserName(username)
        navigate('/'); 
      } else {
        setLoginStatus('error');
      }
    } catch (error) {
      console.error('Error submitting signup:', error);
      setLoginStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-16 px-6">
      <div className="bg-white shadow-lg rounded-md p-8 max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-teal-600 mb-6">Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email </label>
            <input 
              type="email"
               id="email" 
               className="border border-gray-300 focus:border-teal-500 focus:ring-teal-500 rounded-md w-full px-3 py-2" 
               value={email}
                onChange={(e) => setEmail(e.target.value)}
    
               />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              className="border border-gray-300 focus:border-teal-500 focus:ring-teal-500 rounded-md w-full px-3 py-2" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              
              />
          </div>

          <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-md w-full">Login</button>
        </form>

        {loginStatus === 'success' && (
          <p className="text-green-600">Login successful!</p>
        )}
        {loginStatus === 'error' && (
          <p className="text-red-600">An error occurred during Login. Please try again.</p>
        )}
      </div>
    </div>
  );
}

export default Login;
