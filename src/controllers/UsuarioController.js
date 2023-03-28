import { hash } from 'bcrypt';
import { UsuarioService } from '../services/index.js';

const usuarioService = new UsuarioService();

export default class UsuarioController {
	async detalhar(req, res) {
		const idUsuario = req.usuario_id;

		try {
			const usuario = await usuarioService.detalhar(idUsuario);

			return res.status(200).json(usuario);
		} catch (error) {
			return res
				.status(500)
				.json({ mensagem: `Erro interno: ${error.message}` });
		}
	}

	async cadastrar(req, res) {
		const { nome, email, senha } = req.body;
		try {
			const senhaCriptografada = await hash(String(senha), 10);

			const usuario = await usuarioService.fundir({
				nome,
				email,
				senha: senhaCriptografada
			});

			if (!usuario) {
				return res.status(400).json({
					mensagem: 'Já existe usuário cadastrado com o e-mail informado.'
				});
			}
		} catch (error) {
			return res
				.status(500)
				.json({ mensagem: `Erro interno: ${error.message}` });
		}
	}

	async atualizar(req, res) {
		const idUsuario = req.usuario_id;
		const { nome, email, senha } = req.body;

		try {
			const senhaCriptografada = await hash(String(senha), 10);

			const usuario = await usuarioService.fundir({
				id: idUsuario,
				nome,
				email,
				senha: senhaCriptografada
			});

			if (!usuario) {
				return res.status(400).json({
					mensagem:
						'O e-mail informado já está sendo utilizado por outro usuário.'
				});
			}

			return res.status(204).json();
		} catch (error) {
			return res
				.status(500)
				.json({ mensagem: `Erro interno: ${error.message}` });
		}
	}

	async login(req, res) {
		const { email, senha } = req.body;

		try {
			const usuario = await usuarioService.login({ email, senha });

			if (!usuario) {
				return res
					.status(400)
					.json({ mensagem: 'Usuário e/ou senha inválido(s).' });
			}

			res.status(200).json(usuario);
		} catch (error) {
			return res
				.status(500)
				.json({ mensagem: `Erro interno: ${error.message}` });
		}
	}
}
