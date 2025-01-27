# CRUD com Prisma ORM

Este projeto é um exemplo de CRUD utilizando o Prisma ORM. Ele demonstra como criar, ler, atualizar e deletar dados em um banco de dados relacional, além de explorar funcionalidades avançadas do Prisma. O projeto usa a biblioteca `@prisma/client` para interagir com o banco de dados.

## Estrutura do Banco de Dados

A tabela `users` é utilizada neste projeto com a seguinte definição no banco de dados:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  age INT,
  balance FLOAT DEFAULT 0.0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

No Prisma, o modelo `User` correspondente no arquivo `schema.prisma` está definido como:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  age       Int?
  balance   Float    @default(0)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())

  @@map("users")
}
```

## Preparação do Ambiente

### Atualizando o Modelo Prisma

Após alterar o modelo `User` no arquivo `schema.prisma`, é necessário atualizar o banco de dados e a biblioteca `@prisma/client`. Para isso, siga os passos abaixo:

1. **Gerar a biblioteca Prisma:**

   ```bash
   npx prisma generate
   ```

2. **Criar a migração e aplicar ao banco de dados:**

   ```bash
   npx prisma migrate dev --name update-model-user
   ```

   Isso criará uma nova migração na pasta `prisma/migrations` e atualizará o banco de dados de acordo com o modelo.

3. **Forçar a sincronização do banco de dados (se necessário):**
   Caso o banco de dados já possua dados conflitantes com o modelo, utilize:

   ```bash
   npx prisma db push --accept-data-loss
   ```

   > **Atenção:** Este comando pode causar perda de dados. Use com cuidado.

## CRUD

As operações de CRUD foram implementadas no arquivo principal do projeto. Abaixo estão exemplos de cada operação:

### 1. **Create (Criar)**

Criar um novo usuário:

```javascript
const createUser = async () => {
  await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@email.com",
      age: 30,
    },
  });
};
```

### 2. **Read (Consultar)**

Consultar todos os usuários maiores de 18 anos:

```javascript
const getUsers = async () => {
  return await prisma.user.findMany({
    where: {
      age: {
        gte: 18,
      },
    },
    orderBy: {
      name: "asc",
    },
  });
};
```

### 3. **Update (Atualizar)**

Atualizar o nome de um usuário:

```javascript
const updateUser = async () => {
  await prisma.user.update({
    where: {
      email: "alice@email.com",
    },
    data: {
      name: "Alice Updated",
    },
  });
};
```

### 4. **Delete (Deletar)**

Deletar usuários com idade menor que 18 anos:

```javascript
const deleteUsers = async () => {
  await prisma.user.deleteMany({
    where: {
      age: {
        lt: 18,
      },
    },
  });
};
```

## Execução do Projeto

Para executar o projeto e testar as operações CRUD, siga os passos:

1. **Instalar dependências:**

   ```bash
   npm install
   ```

2. **Configurar o banco de dados:**
   Edite o arquivo `.env` para configurar a conexão com o banco de dados.

3. **Executar o projeto:**

   ```bash
   npm run start
   ```

## Boas Práticas

- Sempre versione suas migrações para manter o histórico de alterações no banco de dados.
- Utilize validações no frontend/backend para evitar inconsistências nos dados.
- Mantenha backups regulares do banco de dados.

## Informações do Projeto

- **Nome:** -
- **Versão:** 1.0.0
- **Licença:** MIT
- **Autor:** G. J. Oliveira ([development@gjoliveira.dev](mailto:development@gjoliveira.dev))
- **Repositório:** [GitHub](https://github.com/gjoliveira963/_)

## Conclusão

Este projeto fornece uma base sólida para implementar operações de CRUD com o Prisma ORM. Explore as funcionalidades avançadas do Prisma para otimizar sua aplicação e simplificar a interação com o banco de dados.

---

🚀 **Dica:** Personalize este projeto adicionando novas funcionalidades e explorando integrações com outras tecnologias!
