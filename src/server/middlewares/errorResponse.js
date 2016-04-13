export default function errorResponse() {
	return async (context, next) => {
		try {
			await next();
		} catch (error) {
			console.warn('\nError! (final error middleware)', error);

			context.status = error.status || 500;

			context.body = {
				error: {
					code: 0,
					message: error.message,
					description: '' // TODO - limit error description for production
				}
			};

			context.app.emit('error', error, context);
		}
	};
}
