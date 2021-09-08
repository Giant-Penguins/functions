const { db } = require('../util/admin');

exports.getAllTodos = (request, response) => {
	return db
		.collection('todos')
		.orderBy('createtat', 'desc')
		.get()
		.then((data) => {
			let todos = [];
			data.forEach((doc) => {
                console.log("DEBUG", doc.id)
				todos.push({
                    todoId: doc.id,
                    title: doc.data().title,
					body: doc.data().body,
					createtat: doc.data().createtat,
				});
			});
			return response.json(todos);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};