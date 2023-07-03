const mongoose = require('mongoose')
require('dotenv').config()

async function conectaBanco(){
    try{
    console.log('Conexão iniciada com o banco de dados')

    await mongoose.connect(process.env.MONGO_URL)

    console.log('Conexão com o banco de dados foi realizada com sucesso!')

} catch(erro){
    console.log(erro)
}
}

module.exports = conectaBanco