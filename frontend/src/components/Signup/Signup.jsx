import {React, useState} from 'react';

function Signup() {

  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signupStatus, setSignupStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName : name,
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        setSignupStatus('success');
      } else {
        setSignupStatus('error');
      }
    } catch (error) {
      console.error('Error submitting signup:', error);
      setSignupStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-16 px-6">
      <div className="bg-white shadow-lg rounded-md p-8 max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-teal-600 mb-6">Create Your Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input 
              type="text" 
              id="name" 
              className="border border-gray-300 focus:border-teal-500 focus:ring-teal-500 rounded-md w-full px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-6">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
            <input 
              type="text" 
              id="username" 
              className="border border-gray-300 focus:border-teal-500 focus:ring-teal-500 rounded-md w-full px-3 py-2"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              
              />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
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
        

          <button 
            type="submit" 
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-3 rounded-md w-full" 
            >Signup</button>


        </form>

        {signupStatus === 'success' && (
          <p className="text-green-600">Signup successful!</p>
        )}
        {signupStatus === 'error' && (
          <p className="text-red-600">An error occurred during signup. Please try again.</p>
        )}
      </div>
    </div>
  );
}

export default Signup;
