import React, { useState } from 'react';
import './SignIn.css';

export default function SignIn({ setToken, signIn }) {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await signIn({userName, password});
    if (token) {
      setToken(token);
    }
  }

  return(
    <div className="login-wrapper container">
      <h1 className="mb-5">Log In</h1>
      <form className="form-group" onSubmit={handleSubmit }>
        <div className="input-group row">
            <p className="p-0 mb-1">Username</p>
            <input type="text" className="form-control" aria-label="Username"
              onChange={e => setUserName(e.target.value)}/>
        </div>
        <div className="input-group row">
            <p className="p-0 mb-1">Senha</p>
            <input type="password" className="form-control" aria-label="Password"
              onChange={e => setPassword(e.target.value)}/>
        </div>
        <div className="submit-btn">
          <button className="btn btn-primary mt-4 w-100" type="submit">Login</button>
        </div>

        <p className="mt-2">Não possui conta?<a className="ml-2" href="/signUp">Inscreva-se</a></p>
      </form>
    </div>
  )
}