const express = require('express') //iniciando express
const router = express.Router() //configurando rota
const cors = require('cors')
const app = express()   //inicia app
app.use(express.json())
app.use(cors())
const porta = 3333 //cria porta
const conectaBanco = require('./bancoDeDados') //iniciando banco de dados
conectaBanco()
const mulher = require('./mulherModel')

//GET
 async function mostraMulheres(request, response){
    try{
        const mulheresBanco = await mulher.find()
        response.json(mulheresBanco)
    } catch (erro){
        console.log(erro)
    }
}
//POST
async function criaMulher(request, response){
    const novaMulher = new mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })
    try{
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    } catch(erro){
        console.log(erro)
    }
}

//PATCH
async function corrigeMulher(request, response){
    try{
        const mulherEncontrada = await mulher.findById(request.params.id)
        if (request.body.nome){
            mulherEncontrada.nome = request.body.nome
        }
        if (request.body.imagem){
            mulherEncontrada.imagem = request.body.imagem
        }
        if (request.body.minibio){
            mulherEncontrada.minibio = request.body.minibio
        }
        if (request.body.citacao){
            mulherEncontrada.citacao = request.body.citacao
        }
        const mulherAtualizada = await mulherEncontrada.save()
        response.json(mulherAtualizada)
    } catch (erro){
        console.log(erro)
    }
}

//DELETE
async function deletaMulher(request, response){
    try{
        await mulher.findByIdAndDelete(request.params.id)
        response.json({menssagem: 'Mulher deletada com sucesso!'})
    } catch (erro){
        console.log(erro)
    }
}
//porta
function mostraPorta() {
    console.log('Servidor criado e rodando na porta ', porta)
}

app.use(router.get('/mulheres', mostraMulheres)) //configuração da rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) //configuração da rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) //configuração da rota PATCH /mulheres
app.use(router.delete('/mulheres/:id', deletaMulher)) //configuração da rota DELETE /mulheres
app.listen(porta, mostraPorta) //servidor ouvindo porta
