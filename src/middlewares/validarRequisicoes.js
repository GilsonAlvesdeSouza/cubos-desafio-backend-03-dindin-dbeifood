export const validarRequisicoes = (joiSchema) => async (req, res, next) => {
	try {
		await joiSchema.validateAsync(req.body);
		next();
	} catch (error) {
		console.log(error.details);
		if (error.details) {
			return res.status(400).json({ mensagem: error.message });
		}

		return res.status(500).json({ mensagem: `Erro interno: ${error.message}` });
	}
};

export const validarTipoTransacao = () => (req, res, next) => {
	const tipo = req.body.tipo;
	const tipos = {
		entrada: 'entrada',
		saida: 'saida'
	};

	if (!tipos[tipo]) {
		return res
			.status(400)
			.json({ mensagem: "O tipo precisa ser 'entrada' ou 'saida'." });
	}
	next();
};
