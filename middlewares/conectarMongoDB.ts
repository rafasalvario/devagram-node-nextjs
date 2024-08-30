import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import mongoose from "mongoose";
import type { RespostaPadraoMsg } from '../types/RespostaPadraoMsg';

export const conectarMongoDB = (handler : NextApiHandler) =>
    async (req : NextApiRequest, res : NextApiResponse<RespostaPadraoMsg>) => {

// verificar se o banco já está conectado, se estiver seguiremos para o endpoint ou próximo middleware 
if (mongoose.connections[0].readyState){
    return handler(req, res);   
}


// já que não está conectado, vamos conectar
//obter variável de ambiente preenchida do env
const {DB_CONEXAO_STRING} = process.env;
console.log(DB_CONEXAO_STRING)
//se  a env estiver, abortar o uso do sistema e avisar o programador
if(!DB_CONEXAO_STRING){
    return res.status(500).json({ erro: 'ENV de configuração do banco, não informado'});
    
}
    mongoose.connection.on('connected', () => console.log('Banco de dados conectado'));
    mongoose.connection.on('error', error => console.log('Ocorreu um erro ao  conectar no banco de dados'));
    await mongoose.connect(DB_CONEXAO_STRING);
   

    //agora é possível ir para o endpoint, pois estamos conectados no banco
    return handler(req, res);
}