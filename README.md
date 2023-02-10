<h1>Trybe Futebol Club</h1>
Este aplicativo é um dos projetos avaliados no módulo de backend do curso de desenvolvimento web na Trybe. Recebi um frontend React que exibe informações sobre jogos de futebol e classificações.

E de onde vêm essas informações? Do Backend! Eu tive a tarefa de desenvolver uma API seguindo a arquitetura MSC, usando TypeScript e POO, a partir de um frontend sem lógica para:

Criar e manipular um banco de dados MySQL para armazenar dados;
Autenticar usuários através do login;
Listar clubes registrados;
Listar jogos em andamento e jogos finalizados;
Adicionar jogos em andamento;
Atualizar o placar dos jogos em andamento;
Finalizar jogos;
Criar leaderboards classificadas e ordenadas com base no desempenho dos clubes em jogos registrados, usando 5 critérios avaliativos e separados em 3 tipos de classificação (geral, mandante e visitante);
Orquestrar tudo isso (banco de dados, backend e frontend) em containers Docker usando Docker-Compose para executar juntos.

# Stacks usadas:
Node.js
TypeScript
Programação Orientada a Objetos
Express
MySQL
Sequelize
Docker

# Além das Stacks acima, também foram usadas as bibliotecas:

Joi para validação das requisições;
JWT para autenticação de usuários logados;
bcrypt para criptografia e verificação de senhas armazenadas no banco de dados.

# Como executar localmente:
Certifique-se de ter Docker e Docker-Compose instalados na sua máquina.

Nota: Docker e Docker-Compose usados no desenvolvimento e execução deste projeto estavam nas versões 20.10.23 e 1.29.2, respectivamente.

Clone o projeto:
```
git clone git@github.com:brandao-rafael/trybe-futebol-clube.git
```
Entre no diretório do projeto:
```
cd trybe-futebol-clube
```
Inicie a orquestração de containers na raiz do projeto:
```
npm run compose:up
```
