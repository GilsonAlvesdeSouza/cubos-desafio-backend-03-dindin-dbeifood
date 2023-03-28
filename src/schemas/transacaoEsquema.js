import joi from 'joi';

export const transacaoEsquema = joi.object({
	tipo: joi.string().required().messages({
		'string.base': 'O campo tipo é do tipo texto.',
		'any.required': 'O campo tipo é obrigatório.'
	}),
	descricao: joi.string().required().messages({
		'string.base': 'O campo descrição é do tipo texto.',
		'any.required': 'O campo descrição é obrigatório.'
	}),
	valor: joi.number().required().messages({
		'number.base': 'O campo valor é do tipo numérico.',
		'any.required': 'O campo valor é obrigatório.'
	}),
	data: joi.string().required().messages({
		'string.base': 'O campo data é do tipo texto.',
		'any.required': 'O campo data é obrigatório.'
	}),
	categoria_id: joi.number().required().messages({
		'number.base': 'O campo Id da categoria é do tipo numérico.',
		'any.required': 'O campo Id da categoria é obrigatório.'
	})
});
