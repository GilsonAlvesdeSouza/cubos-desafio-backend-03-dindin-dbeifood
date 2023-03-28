import joi from 'joi';

export const usuarioEsquema = joi.object({
	nome: joi.string().required().messages({
		'string.base': 'O campo nome é do tipo texto.',
		'any.required': 'O campo nome é obrigatório.'
	}),
	email: joi.string().email().required().messages({
		'string.base': 'O campo email é do tipo texto.',
		'any.required': 'O campo email é obrigatório.',
		'string.email': 'O campo email precisa ser um email válido.'
	}),
	senha: joi.string().required().messages({
		'string.base': 'O campo senha é do tipo texto.',
		'any.required': 'O campo senha é obrigatório.'
	})
});

export const usuarioEsquemaLogin = joi.object({
	email: joi.string().email().required().messages({
		'string.base': 'O campo email é do tipo texto.',
		'any.required': 'O campo email é obrigatório.',
		'string.email': 'O campo email precisa ser um email válido.'
	}),
	senha: joi.string().required().messages({
		'string.base': 'O campo senha é do tipo texto.',
		'any.required': 'O campo senha é obrigatório.'
	})
});
