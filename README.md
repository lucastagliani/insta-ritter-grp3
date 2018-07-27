# insta-ritter-grp3

O aplicativo insta-ritter-grp3 permite salvar/postar fotos na nuvem e consultá-las posteriormente.

Desde a primeira versão o insta-ritter-grp3 já apresenta uma camada de autenticação para garantir que somente fotos corretas sejam salvas e apenas quem seja autorizado possa consultá-las.

O insta-ritter-grp3 utiliza a estrutura de serviços:
- Amazon API Gateway;
- Amazon Lambda functions;
- Amazon Storage S3;
- Serverless;

##########################################

ROADMAP

V 0.1
- Gravar/postar fotos na nuvem;
- Consultar fotos;
- Autenticação;
- Informações salvas em base de dados;

V 1.0
- Fotos são postadas numa fila e um consumidor/worker grava no banco;
- Usuário pode, além de consultar, alterar informações de uma foto;

V2.0
- Inclusão de fila de erro com repostagem de mensagem para consumo;
