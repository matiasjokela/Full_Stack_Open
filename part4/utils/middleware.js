const { response } = require('../app')
const logger = require('./logger')




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

// const tokenExtractor = (request, response, next) => {
// 	const authorization = request.get('authorization')
// 	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
// 		request.token = authorization.substring(7)
// 		console.log('token', request.token)
// 		next()
// 	} else {
// 		request.token = null
// 		next()
// 	}
	

// }

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	//tokenExtractor
}