import React from 'react';
import Link from 'next/link';
import Layout from '../../components/layout';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Login = ({ global, pageData, preview }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/profile')
      return;
    }
  })
  
  const Submit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:1337/api/auth/local', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    });

    const data = await res.json();

    if(res.ok) {
      localStorage.setItem('token', data.jwt);
      router.push('/profile');
    } else {
      setError(data.error.message);
    }
  };

  return (
    <Layout
      global={global}
      type="restaurant-page"
      pageData={pageData}
      preview={preview}
    >
        <h1>LOGIN</h1>
        <form onSubmit={Submit} className="rounded-lg border-4 border-black border-double shadow-2xl">
            <label for="email">Email:</label><br></br>
            <input type="text" placeholder="Email" value={identifier} onChange={(e) => setIdentifier(e.target.value)} className="border-solid border-2 border-black"></input><br></br>
            <label for="password">Password:</label><br></br>
            <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border-solid border-2 border-black"></input><br></br>
            <button type="submit" className="ring-2 ring-black bg-slate-800 text-white">Login</button>
            <Link href="/register">
              <a type="button">
                REGISTER
              </a>
            </Link>
        </form>
        {error && <p>{error}</p>}
    </Layout>   
    );
};

export default Login;
