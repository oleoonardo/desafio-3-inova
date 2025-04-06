# Formulário de Inscrição - Inova Maranhão

Este projeto é um **formulário de inscrição** desenvolvido para o programa **Inova Maranhão**, uma iniciativa que visa promover a inovação e o desenvolvimento tecnológico no estado do Maranhão. O formulário foi criado com **React**, **Tailwind CSS**, **Vite**, **Node.js** e Banco de Dados **MongoDB**, oferecendo uma experiência de usuário moderna e responsiva.

## 🚀 Funcionalidades

- **Formulário de Inscrição Completo**:
  -- Captura de dados pessoais, como nome, CPF, data de nascimento, sexo, e-mail e telefone.
  - Upload de documentos (RG e comprovante de residência).
  - Seleção de trilhas de aprendizagem (Front-end, Back-end, Jogos, UX, Ciência de Dados).
  - Validação em tempo real de todos os campos.

- **Navegação entre Páginas**:
  - Página inicial com boas-vindas e explicação sobre o programa.
  - Página de cadastrar para criar um usuário
  - Página de login para entrar com o usuário criado
  - Página de formulário para preenchimento dos dados.
  - Página de confirmação após a conclusão da inscrição.

- **Design Responsivo**:
  - Layout adaptado para dispositivos móveis e desktops.
  - Estilos personalizados com **Tailwind CSS** e **CSS customizado**.

- **Validação de Dados**:
  - Varificação de usuário e senha no banco de dados
  - Verificação de campos obrigatórios.
  - Validação de formatos (CPF, e-mail, telefone, CEP, etc.).
  - Feedback visual para erros de preenchimento.

- **Upload de Arquivos**:
  - Upload de documentos em formato PDF.
  - Visualização e remoção de arquivos enviados.

## 🛠️ Tecnologias Utilizadas

- **JavaScript**: Linguagem principal do projeto.
- **HTML**: Estruturação do conteúdo do site.
- **CSS**: Estilização dos componentes.
- **React**: Biblioteca JavaScript para construção da interface do usuário.
- **React Router**: Gerenciamento de rotas e navegação entre páginas.
- **Tailwind CSS**: Framework CSS para estilização rápida e responsiva.
- **Vite**: Ferramenta de build para desenvolvimento rápido e eficiente.
- **Google Fonts**: Utilização da fonte **Poppins** para melhor legibilidade.
- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework para construção de APIs e aplicações web em Node.js.
- **MongoDB**: Banco de dados para armazenamento de dados.
- **BcryptJS**: Biblioteca para hash de senhas e segurança de dados.



## 📂 Estrutura do Projeto
```
formulario-inscricao/
├── node_modules/
├── public/
│   ├── assets/
│   │   ├── Vector.png
│   │   ├── Camada_1.png
│   │   ├── Camada_2.png
│   │   ├── checkedVerde.png
│   │   ├── Seta pra Esquerda.png
│   │   ├── trash.png
│   │   ├── FileUploadField.png
│   │   ├── Logo Front-end.png
│   │   ├── Logo Back-end.png
│   │   ├── Logo Jogos.png
│   │   ├── Logo UX.png
│   │   └── Logo Dados.png
│   └── vite.svg
├── server/
│   ├── .env
│   └── server.js
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Cadastrar.jsx
│   │   ├── Final.jsx
│   │   ├── Home.jsx
│   │   ├── Inicial.jsx
│   │   └── Login.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## 🖥️ Como Executar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/formulario-inscricao.git
   ```
2. **Instale as dependências**:
   ```bash
   cd formulario-inscricao
   npm install
   ```
3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
4. **Acesse o projeto**:
   Abra o navegador e acesse o local do host que aparecer:
   ```
   Exemplo: http://localhost:5173
   ```

## 📝 Páginas do Projeto

### **Página Inicial**
- Boas-vindas ao programa Inova Maranhão com escolha de Logim ou Cadastro.
- Após o cadastro e login tem a tela de formulário
- Botão para iniciar o preenchimento do formulário.

### **Página de Login**  
- Formulário de autenticação com campos:  
  - E-mail ou usuário cadastrado  
  - Senha    
- Botão para redirecionar ao cadastro  

### **Página de Cadastro**  
- Formulário de criação de conta com:  
  - Dados de usuário ou email    
  - Criação de senha segura
  - Validação da senha
- Validação em tempo real  
- Link para login (caso já tenha conta)  

### **Página do Formulário**
- Formulário dividido em seções:
  - Informações do Participante.
  - Endereço Residencial.
  - Seleção de Trilhas de Aprendizagem.
- Validação em tempo real e feedback de erros.
- Upload de documentos (RG e comprovante de residência).

### **Página de Confirmação**
- Mensagem de sucesso após a conclusão da inscrição.
- Botão para voltar à página inicial.

## 🎨 Design e Estilos

### **Tailwind CSS**
- Utilizado para criar estilos responsivos e componentes reutilizáveis.
- Personalização de cores e estilos no arquivo `index.css`.

### **🔍 Ícones e Imagens**
- Ícones personalizados para upload de arquivos, seleção de trilhas e feedback visual.

## ✅ Validação de Dados

### **Campos Obrigatórios**
- Todos os campos são validados antes do envio do formulário.
- Mensagens de erro específicas para cada campo.

### **Formatação**
- Validação de CPF, e-mail, telefone e CEP.
- Verificação de datas (idade mínima de 15 anos).

## 🚀 Como Contribuir
1. Faça um fork do projeto.
2. Crie uma branch:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commit das alterações:
   ```bash
   git commit -m "Adicionando nova funcionalidade"
   ```
4. Envie as alterações:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

## 📚 Licença
Este projeto está sob a **licença MIT**.

## 👤 Autores
Desenvolvido por Bruno Kauan e Leonardo Ferreira