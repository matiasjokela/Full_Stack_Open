const { response } = require('../app')
const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')




const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message)
	next(error)
}

const tokenExtractor = (request, response, next) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		request.token = authorization.substring(7)
	} else {
		request.token = null
	}
	next()
}

const userExtractor = async (request, response, next) => {
	let decodedToken = null
	if (request.token) {
		decodedToken = jwt.verify(request.token, process.env.SECRET)
	}
	if (!decodedToken || !decodedToken.id) {
		request.user = null
	} else {
		request.user = await User.findById(decodedToken.id)
	}
	next()
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor
}