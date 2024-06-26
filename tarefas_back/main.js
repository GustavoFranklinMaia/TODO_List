const PORTA = 5000;
const URL_BANCO_DE_DADOS = 'mongodb://10.0.80.122:27017/Monitoramento';

// Importando bibliotecas
const express    = require('express');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const cors       = require('cors');

// Criando o servidor web
const app = express();

// Configurando o servidor web (middleware)
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conecto os controllers
app.use('/tarefas', require('./controllers/tarefa_controller'));
app.use('/auth', require('./controllers/authentication_controller'));
app.use('/users', require('./controllers/user_controller'));

// Conectando ao banco de dados
console.log('Conectando ao banco de dados...');
mongoose.connect(URL_BANCO_DE_DADOS).then(() => {
  console.log('Conectado ao banco de dados com sucesso !');
  // Iniciando o servidor web
  console.log('Iniciando o servidor web...');
  app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
  });
});

