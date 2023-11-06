
![APIREST](https://github.com/Daniel-S-Navarro/API-REST/assets/132966771/61da8216-f806-4932-a93f-028b1d9b7d05)

---
### Funcionalidades
---

- Cadastrar Usuário
- Fazer Login 
- Detalhar Perfil do Usuário Logado 
- Editar Perfil do Usuário Logado 
- Listar categorias 
- Listar transações 
- Detalhar transação 
- Cadastrar transação 
- Editar transação 
- Remover transação 
- Obter extrato de transações 

---
#### Rotas
---

![Rotas](https://github.com/Daniel-S-Navarro/API-REST/assets/132966771/9c7c6684-5d34-4c40-8bff-d48605b5ee8d)


---
###Banco de dados
---

```javascript

Foi criado um Banco de Dados PostgreSQL chamado `dindin` contendo as seguintes tabelas e colunas:  

- usuarios
  - id
  - nome
  - email (campo único)
  - senha
- categorias
  - id
  - descricao
- transacoes
  - id
  - descricao
  - valor
  - data
  - categoria_id
  - usuario_id
  - tipo

  **Categorias**

- Alimentação
- Assinaturas e Serviços
- Casa
- Mercado
- Cuidados Pessoais
- Educação
- Família
- Lazer
- Pets
- Presentes
- Roupas
- Saúde
- Transporte
- Salário
- Vendas
- Outras receitas
- Outras despesas

```
- **Banco de dados criado utilizando a ferramenta beekeeper.**

![bancoDeDados](https://github.com/Daniel-S-Navarro/API-REST/assets/132966771/2a01a232-e5ab-4d5b-b447-287ee724bc76)

- **Instruções de criação do banco de dados.**

![comandosSql](https://github.com/Daniel-S-Navarro/API-REST/assets/132966771/08afc28e-2c50-4837-afe5-1826d1d0e21a)

---
###Rotas
---

##### 1. Cadastrar usuário

- **Método:** POST
- **Rota:** /usuario
- **Descrição:** Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

##### 2. Fazer login
- **Método:** POST
- **Rota:** /login
- **Descrição:** Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

---
**ATENÇÃO**: _Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, exigirão o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade será necessário validar o token informado_

---

##### 3. Detalhar perfil do suário logado
- **Método:** GET
- **Rota:** /usuario
- **Descrição:** Essa é a rota que será chamada quando o usuario quiser obter os dados do seu próprio perfil.


##### 4. Atualizar usuário
- **Método:** PUT
- **Rota:** /usuario
- **Descrição:** Essa é a rota que será chamada quando o usuário quiser realizar alterações no seu próprio cadastro.

##### 5. Listar categorias
- **Método:** GET
- **Rota:** /categoria
- **Descrição:** Essa é a rota que será chamada quando o usuario logado quiser listar todas as categorias cadastradas.

##### 6. Listar transações
- **Método:** GET
- **Rota:** /transacao
- **Descrição:** Essa é a rota que será chamada quando o usuario logado quiser listar todas as suas transações cadastradas.

##### 7. Detalhar transação
- **Método:** GET
- **Rota:** /transacao/:id
- **Descrição:** Essa é a rota que será chamada quando o usuario logado quiser obter uma das suas transações cadastradas.

##### 8. Cadastrar transação
- **Método:** POST
- **Rota:** /transacao
- **Descrição:** Essa é a rota que será utilizada para cadastrar uma transação associada ao usuário logado.

##### 9. Editar transação
- **Método:** PUT
- **Rota:** /transacao/:id
- **Descrição:** Essa é a rota que será chamada quando o usuario logado quiser atualizar uma das suas transações cadastradas.

##### 10. Remover transação
- **Método:** DELETE
- **Rota:** /transacao/:id
- **Descrição:** Essa é a rota que será chamada quando o usuario logado quiser excluir uma das suas transações cadastradas.

##### 11. Obter extrato de transações
- **Método:** GET
- **Rota:** /transacao/extrato
- **Descrição:** Essa é a rota que será chamada quando o usuario logado quiser obter o extrato de todas as suas transações cadastradas.

---
### Autor : Daniel Navarro
---


