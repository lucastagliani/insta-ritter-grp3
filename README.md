# insta-ritter-grp3

O aplicativo insta-ritter-grp3 permite salvar/postar fotos na nuvem e consultá-las posteriormente.

Desde a primeira versão o insta-ritter-grp3 já apresenta uma camada de autenticação para garantir que somente fotos corretas sejam salvas e apenas quem seja autorizado possa consultá-las.

O insta-ritter-grp3 utiliza a estrutura de serviços:
- Amazon API Gateway;
- Amazon Lambda;
- Amazon S3;
- Serverless;
- Cognito Identity Provider;
- R3 Database;

##########################################

ROADMAP

V 0.1 - A versão beta do insta-ritter-grp3 possui as seguintes features:
- Gravar/postar fotos na nuvem;
- Consultar fotos;
- Autenticação (Facebook ou própria);

V 1.0
- Utilização de filas para postagem e consumo de fotos;
- Possibilidade de editar informações de fotos já gravadas;

V2.0
- Inclusão de fila de erro com repostagem de mensagem para consumo;
