import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import mongoose from "mongoose";

export const conectarMongoDB = (handler : NextApiHandler) =>
(req : NextApiRequest, res : NextApiResponse) => {

// verificar se o banco já está conectado, se estiver seguiremos para o endpoint ou próximo middleware 
if (mongoose.connections[0].readyState){
    return handler(req, res);   
}


// já que não está conectado, vamos conectar
//obter variável de ambiente preenchida do env
const {DB_CONEXAO_STRING} = process.env;

//se  a env estiver, abortar o uso do sistema e avisar o programador
if(!DB_CONEXAO_STRING){
    return res.status(500)
}
 
}