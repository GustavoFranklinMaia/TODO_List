import React, { useState } from 'react';

export default function SignUp({ signUp }) {
    const [userName, setUserName] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signUp({
            userName,
            firstName,
            lastName,
            email,
            password
        });
        console.log(res);
      }

    return(
        <div className="login-wrapper container">
          <h1 className="mb-5">Criar conta</h1>
          <form className="form-group" onSubmit={ handleSubmit }>
            <div className="input-group row">
                <p className="p-0 mb-1">Primeiro Nome</p>
                <input type="text" className="form-control" aria-label="firstName"
                  onChange={e => setFirstName(e.target.value)}/>
            </div>
            <div className="input-group row">
                <p className="p-0 mb-1">Segundo Nome</p>
                <input type="text" className="form-control" aria-label="lastName"
                  onChange={e => setLastName(e.target.value)}/>
            </div>
            <div className="input-group row">
                <p className="p-0 mb-1">Username</p>
                <input type="text" className="form-control" aria-label="userName"
                  onChange={e => setUserName(e.target.value)}/>
            </div>
            <div className="input-group row">
                <p className="p-0 mb-1">E-mail</p>
                <input type="text" className="form-control" aria-label="email"
                  onChange={e => setEmail(e.target.value)}/>
            </div>
            <div className="input-group row">
                <p className="p-0 mb-1">Senha</p>
                <input type="password" className="form-control" aria-label="passwrod"
                  onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="submit-btn">
              <button className="btn btn-primary mt-4 w-100" type="submit">Criar conta</button>
            </div>
          </form>
        </div>
    )
}
