import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Função para criar um usuário único
const createOne = async () => {
  try {
    return await prisma.user.create({
      data: {
        name: "Alice",
        email: "alice@email.com",
        age: 30,
      },
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
  }
};

// Função para criar outro usuário único
const createTwo = async () => {
  try {
    return await prisma.user.create({
      data: {
        name: "Bianca",
        email: "bianca@email.com",
        age: 30,
      },
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
  }
};

// Função para criar 4 usuários aleatórios
const createFourRandomUsers = async () => {
  const users = [
    { name: "Charlie", email: "charlie@email.com", age: 27 },
    { name: "David", email: "david@email.com", age: 17 },
    { name: "Eve", email: "eve@email.com", age: 26 },
    { name: "Frank", email: "frank@email.com", age: 16 },
  ];

  try {
    const result = await prisma.user.createMany({
      data: users,
      skipDuplicates: true, // Ignorar duplicatas baseadas em campos únicos
    });

    console.log("Usuários criados com sucesso:", result);
    return result;
  } catch (error) {
    console.error("Erro ao criar usuários:", error);
  }
};

// Função para consultar um usuário específico
const queryOne = async () => {
  return await prisma.user.findUnique({
    where: { email: "alice@email.com" },
    select: { id: true, name: true, email: true, age: true },
  });
};

// Função para consultar o primeiro usuário com um critério específico
const queryTwo = async () => {
  return await prisma.user.findFirst({
    where: { name: { contains: "Bianca" } },
    select: { id: true, name: true, email: true, age: true },
  });
};

// Função para consultar múltiplos usuários com filtro
const queryMany = async () => {
  return await prisma.user.findMany({
    where: { age: { gte: 18 } }, // Idade >= 18
    orderBy: { name: "asc" }, // Ordenado pelo nome
  });
};

// Função para atualizar um usuário
const updateOne = async () => {
  return await prisma.user.update({
    where: { email: "alice@email.com" },
    data: { name: "Alice Updated", balance: 100.5 },
  });
};

// Função para atualizar múltiplos usuários
const updateMany = async () => {
  return await prisma.user.updateMany({
    where: { age: { lt: 18 } }, // Idade < 18
    data: { isActive: false }, // Desativar usuários menores de 18 anos
  });
};

// Função para criar ou atualizar um usuário
const upsertUser = async () => {
  return await prisma.user.upsert({
    where: { email: "david@email.com" },
    update: { name: "David Updated", age: 40, balance: 200.0 },
    create: {
      name: "David",
      email: "david@email.com",
      age: 28,
      balance: 100.0,
    },
  });
};

// Função para deletar um único usuário
const deleteOne = async () => {
  return await prisma.user.delete({
    where: { email: "bianca@email.com" },
  });
};

// Função para deletar múltiplos usuários
const deleteMany = async () => {
  return await prisma.user.deleteMany({
    where: { age: { lt: 18 } }, // Deleta usuários menores de 18 anos
  });
};

// Função principal para executar o CRUD em sequência
const executeCRUD = async () => {
  try {
    console.log("Iniciando CRUD...");

    // Create
    console.log("Criando usuário 1...");
    await createOne();
    console.log("---------------------------------");
    console.log("Criando usuário 2...");
    await createTwo();
    console.log("---------------------------------");
    console.log("Criando 4 usuários aleatórios...");
    await createFourRandomUsers();
    console.log("---------------------------------");

    // Read
    console.log("Consultando usuário único...");
    console.log(await queryOne());
    console.log("---------------------------------");
    console.log("Consultando usuário com filtro...");
    console.log(await queryTwo());
    console.log("---------------------------------");
    console.log("Consultando múltiplos usuários...");
    console.log(await queryMany());
    console.log("---------------------------------");

    // Update
    console.log("Atualizando usuário único...");
    console.log(await updateOne());
    console.log("---------------------------------");
    console.log("Atualizando múltiplos usuários...");
    console.log(await updateMany());
    console.log("---------------------------------");

    // Upsert
    console.log("Executando upsert...");
    console.log(await upsertUser());
    console.log("---------------------------------");

    // Delete
    console.log("Deletando usuário único...");
    console.log(await deleteOne());
    console.log("---------------------------------");
    console.log("Deletando múltiplos usuários...");
    console.log(await deleteMany());
    console.log("---------------------------------");

    console.log("CRUD concluído com sucesso!");
  } catch (error) {
    console.error("Erro durante o CRUD:", error);
  } finally {
    await prisma.$disconnect();
    console.log("Prisma desconectado com sucesso.");
  }
};

// Executar o CRUD
executeCRUD();
