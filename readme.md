## Documentação da API REST para Gerenciamento de Usuários e Decks

### Visão Geral

Esta API permite a criação, leitura, atualização e exclusão (CRUD) de usuários e Decks. Os usuários podem se registrar, fazer login e criar Decks. Cada flashcard é composto por uma pergunta e múltiplas respostas possíveis, com uma indicação de qual resposta é a correta. A autenticação é realizada via JWT.

### Estrutura de Diretórios

```
API/
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   └── deckController.js
│
├── middlewares/
│   └── authMiddleware.js
│
├── models/
│   └── userModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── deckRoutes.js
│
├── index.js
├── package.json
└── README.md
```

### Configuração Inicial

1. **Clonar o Repositório**

   ```bash
   git clone git@github.com:FKouto/DuckieAnki-API.git
   cd DuckieAnki-API
   ```

2. **Instalar Dependências**

   ```bash
   npm install
   ```

3. **Configurar Banco de Dados**

   Criar um banco de dados MySQL e atualizar as configurações no arquivo `config/database.js`.

4. **Configurar Variáveis de Ambiente**

   Criar um arquivo `.env` com as seguintes variáveis:

   ```
   JWT_SECRET=seu_segredo_jwt
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=nome_do_banco
   ```

5. **Iniciar o Servidor**

   ```bash
   npm run start
   ```

# Rotas da API

## Autenticação

1. **Registro de Usuário**

   - **URL**: `/auth/register`
   - **Método**: `POST`
   - **Corpo da Requisição**:

     ```json
     {
       "nome": "",
       "email": "",
       "password": ""
     }
     ```

   - **Resposta**:

     ```json
     {
       "message": "Usuário registrado com sucesso"
     }
     ```

2. **Login de Usuário**

   - **URL**: `/auth/login`
   - **Método**: `POST`
   - **Corpo da Requisição**:

     ```json
     {
       "email": "",
       "password": ""
     }
     ```

   - **Resposta**:

     ```json
     {
       "token": ""
     }
     ```

## Usuários

### Obter todos os usuários

- **Método**: `GET`
- **URL**: `/user/list`
- **Cabeçalho**:

```http
Authorization: Bearer
```

### Obter Usuário por ID

- **Método**: `GET`
- **URL**: `/user/read`
- **Cabeçalho**:

```http
Authorization: Bearer
```

### Atualizar Usuário por ID

- **Método**: `PUT`
- **URL**: `/user/update`
- **Cabeçalho**:

```http
Authorization: Bearer
```

```json
{
  "nome": "",
  "email": "",
  "password": ""
}
```

### Excluir usuário

- **Método**: `DELETE`
- **URL**: `/user/delete`
- **Cabeçalho**:

```http
Authorization: Bearer
```

- **Corpo da Requisição**:
  - Não é necessário

## Decks

1.  **Criar**

    - **URL**: `/deck/create`
    - **Método**: `POST`
    - **Cabeçalho**:

      ```http
      Authorization: Bearer
      ```

    - **Corpo da Requisição**:

      ```json
      {
        "UserDecks":{
            "Decks":[
              {
                  "deckId":"Title",
                  "questions":[
                    {
                        "question":"Question 1",
                        "responses":[
                          "Response 1",
                          "Response 2",
                          "Response 3"
                        ],
                        "correctAnswer":0
                    },
                    {
                        "question":"Question 2",
                        "responses":[
                          "Response A",
                          "Response B",
                          "Response C"
                        ],
                        "correctAnswer":1
                    }
                  ]
              }
            ]
        }
      }
           
      ```

    - **Resposta**:

      ```json
      {
        "message": "Decks inserted successfully"
      }
      ```

2.  **Ler**

    - **URL**: `/decks/read`
    - **Método**: `GET`
    - **Cabeçalho**:

      ```http
      Authorization: Bearer
      ```

    - **Corpo da Requisição**:

      - Não é necessário

3.  **Excluir**

    - **URL**: `/decks/delete/{{nomedodeck}}`
    - **Método**: `GET`
    - **Cabeçalho**:

      ```http
      Authorization: Bearer
      ```

    - **Corpo da Requisição**:

      - Não é necessário

---

## Banco de dados

```
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
CREATE TABLE Decks (
  deckId VARCHAR(255) PRIMARY KEY,
  userId INT,
  FOREIGN KEY (userId) REFERENCES Users(id)
);
CREATE TABLE Questions (
  questionId INT AUTO_INCREMENT PRIMARY KEY,
  deckId VARCHAR(255),
  question TEXT NOT NULL,
  correctAnswer INT NOT NULL,
  FOREIGN KEY (deckId) REFERENCES Decks(deckId)
);
CREATE TABLE Responses (
  responseId INT AUTO_INCREMENT PRIMARY KEY,
  questionId INT,
  response TEXT NOT NULL,
  FOREIGN KEY (questionId) REFERENCES Questions(questionId)
);
```
