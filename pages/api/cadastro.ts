import type {NextApiRequest,NextApiResponse} from 'next';
import type {RespostaPadraoMsg} from '../../types/RespostaPadraoMsg';
import type {CadastroRequisicao} from '../../types/CadastroRequisicao';


const endpointCadastro = (req: NextApiRequest, res : NextApiResponse<RespostaPadraoMsg>) => {

    if(req.method === 'POST'){

        // usar o exemplo req.body com 'as' nos permite digitar várias infos, mas apenas aceitar o que está no arquivo 'CadastroRequisicao'
        const usuario = req.body as CadastroRequisicao;

        if(!usuario.nome || usuario.nome.length <2){
            return res.status(400).json({erro: 'Nome inválido'});
        }

        

    }
    return res.status(405).json({erro: 'Método informado não é válido'});
}
