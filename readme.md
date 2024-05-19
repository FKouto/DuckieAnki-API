## Documentação da API REST para Gerenciamento de Usuários e Flashcards

### Visão Geral

Esta API permite a criação, leitura, atualização e exclusão (CRUD) de usuários e flashcards. Os usuários podem se registrar, fazer login e criar flashcards. Cada flashcard é composto por uma pergunta e múltiplas respostas possíveis, com uma indicação de qual resposta é a correta. A autenticação é realizada via JWT.

### Estrutura de Diretórios

```
project-root/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   └── flashcardController.js
│
├── middlewares/
│   └── authenticate.js
│
├── models/
│   └── userModel.js
│
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── flashcardRoutes.js
│
├── index.js
├── package.json
└── README.md
```

### Configuração Inicial

1. **Clonar o Repositório**

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd project-root
   ```

2. **Instalar Dependências**

   ```bash
   npm install
   ```

3. **Configurar Banco de Dados**

   Criar um banco de dados MySQL e atualizar as configurações no arquivo `config/db.js`.

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
   node server.js
   ```

# Rotas da API

## Autenticação

1. **Registro de Usuário**

   - **URL**: `/api/auth/register`
   - **Método**: `POST`
   - **Corpo da Requisição**:

     ```json
     {
       "nome": "John",
       "email": "john.doe@example.com",
       "password": "senha123"
     }
     ```

   - **Resposta**:

     ```json
     {
       "message": "Usuário registrado com sucesso"
     }
     ```

2. **Login de Usuário**

   - **URL**: `/api/auth/login`
   - **Método**: `POST`
   - **Corpo da Requisição**:

     ```json
     {
       "email": "john.doe@example.com",
       "password": "senha123"
     }
     ```

   - **Resposta**:

     ```json
     {
       "token": "token_jwt_aqui"
     }
     ```

## Usuários
### Obter todos os usuários

- **Método**: `GET`
- **URL**: `/api/users/users`
- **Cabeçalho**:

```http
Authorization: Bearer
```

### Obter Usuário por ID

- **Método**: `GET`
- **URL**: `/api/users/{ID}`
- **Cabeçalho**:

```http
Authorization: Bearer
```

### Atualizar Usuário por ID

- **Método**: `GET`
- **URL**: `/api/users/{ID}`
- **Cabeçalho**:

```http
Authorization: Bearer
```

```json
{
  "nome": "João",
  "sobrenome": "Rodrigues",
  "email": "joao.rodrigues@example.com",
  "password": "senha123"
}
```

### Excluir usuário

- **Método**: `PUT`
- **URL**: `/api/users/{ID}`
- **Cabeçalho**:

```http
Authorization: Bearer
```

- **Corpo da Requisição**:
    - Não é necessário

## Flashcards

1. **Criar flashcard**

   - **URL**: `/api/flashcards`
   - **Método**: `POST`
   - **Cabeçalho**:

     ```http
     Authorization: Bearer
     ```

   - **Corpo da Requisição**:

     ```json
     "UserDecks": {
     "Decks": [
      {
        "deckId": "Nome Deck",
        "questions": [
          {
            "question": "Question 1",
            "responses": ["Response 1", "Response 2", "Response 3"],
            "correctAnswer": 0
          },
          {
            "question": "Question 2",
            "responses": ["Response A", "Response B", "Response C"],
            "correctAnswer": 1
          }
        ]
      },
      {
        "deckId": "Nome Deck",
        "questions": [
          {
            "question": "Question 1",
            "responses": ["Response 1", "Response 2", "Response 3"],
            "correctAnswer": 0
          },
          {
            "question": "Question 2",
            "responses": ["Response A", "Response B", "Response C"],
            "correctAnswer": 1
          }
        ]
      }
     ```

   - **Resposta**:

     ```json
     {
       "message": "Flashcards inserted successfully""
     }
     ```

2. **Ler flashcard**

   - **URL**: `/api/flashcards/`
   - **Método**: `GET`
   - **Cabeçalho**:

     ```http
     Authorization: Bearer
     ```

   - **Corpo da Requisição**:

     - Não é necessário

   - **Resposta**:

     ```json
     {
       "message": "Flashcards do usuário autenticado"
     }
     ```