import React, { useState } from 'react'

const formVazio = () => {
  return {
    titulo: ''
  };
};

export default function FormTarefa({onAdicionar}) {
  const [form, setForm] = useState(formVazio());

  const submeter = (e) => {
    e.preventDefault();
    onAdicionar(form).then(() => {
      setForm(formVazio());
    });
  };

  const setValor = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  return (
    <>
      <h3>Nova Tarefa:</h3>
      <div className='change'>
        <form onSubmit={submeter}>
          <p>
            <label>Tarefa:</label>
            <input name="titulo" value={form.titulo} onChange={setValor}/>
          </p>        
          <p>
            <button className='btn btn-success'>Adicionar</button>
          
          </p>
        </form>
        <button  onClick={()=>{
          let tema = document.getElementById('root')
          tema.className =  tema.className === 'dark' ?  'light' : 'dark'
          console.log(tema)
        }} className='mudarTema'>mudarTema</button>
      

      </div>
    </>
  )
}
