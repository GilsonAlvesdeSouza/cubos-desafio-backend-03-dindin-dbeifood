import Router from 'express';
import {
	CategoriaController,
	TransacaoController,
	UsuarioController
} from './controllers/index.js';
import autenticacao from './middlewares/Autenticacao.js';
import {
	validarRequisicoes,
	validarTipoTransacao
} from './middlewares/validarRequisicoes.js';
import { transacaoEsquema } from './schemas/transacaoEsquema.js';
import {
	usuarioEsquema,
	usuarioEsquemaLogin
} from './schemas/usuarioEsquema.js';

const usuarioController = new UsuarioController();
const categoriaController = new CategoriaController();
const transacaoController = new TransacaoController();

const router = Router();

router.post(
	'/usuario',
	validarRequisicoes(usuarioEsquema),
	usuarioController.cadastrar
);
router.post(
	'/login',
	validarRequisicoes(usuarioEsquemaLogin),
	usuarioController.login
);

router.use(autenticacao);
router.get('/usuario', usuarioController.detalhar);
router.put(
	'/usuario',
	validarRequisicoes(usuarioEsquema),
	usuarioController.atualizar
);

router.get('/categoria', categoriaController.listar);

router.post(
	'/transacao',
	validarRequisicoes(transacaoEsquema),
	validarTipoTransacao(),
	transacaoController.cadastrar
);
router.put(
	'/transacao/:id',
	validarRequisicoes(transacaoEsquema),
	validarTipoTransacao(),
	transacaoController.atualizar
);
router.delete('/transacao/:id', transacaoController.excluir);
router.get('/transacao/extrato', transacaoController.extrato);
router.get('/transacao/:id', transacaoController.detalhar);
router.get('/transacao', transacaoController.listar);

export default router;
