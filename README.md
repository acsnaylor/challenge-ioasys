# Projeto Angular com Tailwind CSS

Este projeto é uma aplicação Angular que utiliza o Tailwind CSS para estilização. Ele inclui funcionalidades como uma página de requerimento de serviço e um componente de anexação de documentos em PDF.

## Estrutura do Projeto

- **src/**: Contém o código-fonte do projeto.
- **angular.json**: Configurações do Angular CLI.
- **package.json**: Dependências do projeto e scripts NPM.
- **tailwind.config.js**: Configurações do Tailwind CSS.
- **tsconfig.json**: Configurações do TypeScript.
- **README.md**: Este arquivo com a documentação do projeto.

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd <nome-do-diretorio>
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

## Executando o Projeto

1. Inicie o servidor de desenvolvimento Angular:
   ```bash
   ng serve
   ```
   Acesse o projeto em `http://localhost:4200/`.

2. Inicie o JSON Server para servir a API simulada:
   ```bash
   npx json-server --watch db.json --port 3000
   ```
   Acesse a API em `http://localhost:3000/`.

## Scripts Disponíveis

- `ng serve`: Inicia o servidor de desenvolvimento.
- `ng build`: Compila o projeto para produção.
- `ng test`: Executa os testes unitários.
- `ng lint`: Verifica a qualidade do código.
- `npx json-server --watch db.json --port 3000`: Inicia o JSON Server para servir a API.

## Estilo

Este projeto utiliza o Tailwind CSS para estilização. As configurações podem ser encontradas no arquivo `tailwind.config.js`.

## Contribuição

Se você deseja contribuir com este projeto, siga os passos abaixo:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Faça push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.