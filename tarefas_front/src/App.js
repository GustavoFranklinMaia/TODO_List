import { useEffect, useState } from "react";
import FormTarefa from "./componentes/FormTarefa";
import ListaDeTarefas from "./componentes/ListaDeTarefas";
import axios from "axios";
import SignIn from "./componentes/signIn/SignIn";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./componentes/signup/SignUp";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const URL_BACK = "http://localhost:5000";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [token, setToken] = useState();

  const signIn = (data) => {
    axios.post(`${URL_BACK}/auth/login`, data)
    .then((res) => {
      if (res.status === 200) {
        setToken(res.data.token);
      }
    }).catch((error) => {
      toast.error("Credenciais inválidas!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
  };
  
  const signUp = (data) => {
    axios.post(`${URL_BACK}/auth/signup`, data)
    .then((data) => {
      toast.success("Usuário criado com sucesso!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }).catch((error) => {
      toast.error("Não foi possível criar o usuário!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    });
  };

  const carregarTarefas = () => {
    axios.get(`${URL_BACK}/tarefas`).then(({ data }) => {
      setTarefas(data);
    });
  };

  useEffect(() => {
    carregarTarefas();
  }, []);

  const adicionarTarefa = (form) => {
    return axios.post(`${URL_BACK}/tarefas`, form).then(() => {
      carregarTarefas();
    });
  };

  const excluirTarefa = (tarefa) => {
    return axios.delete(`${URL_BACK}/tarefas/${tarefa._id}`).then(() => {
      carregarTarefas();
    });
  };

  return (
    <div className="wrapper">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/signUp" element={<SignUp signUp={signUp} />} />
          <Route
            exact path="/"
            element={
              token
              ? <div>
                  <FormTarefa onAdicionar={adicionarTarefa} />
                  <ListaDeTarefas tarefas={tarefas} onExcluir={excluirTarefa} />
                </div>
              : <SignIn setToken={setToken} signIn={signIn} />
            }
          />
        </Routes>
      </Router>
    </div>
    // <>
    //   <FormTarefa onAdicionar={adicionarTarefa}/>
    //   <ListaDeTarefas tarefas={tarefas} onExcluir={excluirTarefa}/>
    // </>
  );
}

export default App;
