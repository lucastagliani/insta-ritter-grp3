# insta-ritter-grp3
- Vladson Freire
- Renan Drabach
- Lucas Tagliani
- Alécio Dalprá


O aplicativo insta-ritter-grp3 permite salvar/postar fotos na nuvem e consultá-las posteriormente.

O insta-ritter-grp3 utiliza a estrutura de serviços:
- Amazon API Gateway;
- Amazon Lambda;
- Amazon S3;
- Serverless;
- Cognito Identity Provider;
- R3 Database;

Tecnologias:
- NodeJS
- HTML
- Javascript

##########################################

ROADMAP

V 0.1 - A versão beta do insta-ritter-grp3 possui as seguintes features:
- Gravar/postar fotos na nuvem;
- Consultar fotos;
- Autenticação (Facebook ou própria);

![Alt text](https://github.com/lucastagliani/insta-ritter-grp3/blob/master/doc/MVP0.png)


V 1.0
- Utilização de filas para postagem e consumo de fotos;
- Possibilidade de editar informações de fotos já gravadas;
![Alt text](https://github.com/lucastagliani/insta-ritter-grp3/blob/master/doc/MVP1.png)

V2.0
- Inclusão de fila de erro com repostagem de mensagem para consumo;
![Alt text](https://github.com/lucastagliani/insta-ritter-grp3/blob/master/doc/MVP2.png)
