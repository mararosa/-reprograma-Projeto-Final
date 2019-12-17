# {reprograma} Projeto Final

Projeto Livre - API construída com CRUD ​(create-read-update-delete)

## Projeto Cofrinho

Meu projeto foi criado para incentivar a educação financeira para crianças e adolescentes.

* Usuário poderá cadastrar seu perfil atualizar, deletar e listar seu perfil;
* Usuário poderá cadastrar um cofrinho, atulizar os valores com entradas e saídas, remover e listar todos os cofrinhos ou por id;
* Usuário poderá cadastrar um desejo, atulizar o valor do desejo, remover e listar todos os desejos ou por id;
* Para acessar os end points autenticados, o usuário precisará fazer login para gerar um token válido.

```
router.patch('/:id', autenticar, controller.update) // atualiza perfil

//kid atualizar seu perfil
const update = (request, response) => {
    const id = request.params.id
    const kidUpdate = request.body
    const options = { new: true }
    kidsModel.findByIdAndUpdate(
        id,
        kidUpdate,
        options,
        (error, kid) => {
            if (error) {
                return response.status(500).send(error)
            }
            if (kid) {
                return response.status(200).send(kid)
            }
            return response.status(404).send('Usuário não encontrado.')
        }
    )
}
```

## Instalação

Dependências necessárias para rodaR o código. Exemplo:

```
npm install express
```

* bcryptjs
* body-parser
* cors
* dotenv
* dotenv-safe
* express
* jsonwebtoken
* mongodb
* mongoose





