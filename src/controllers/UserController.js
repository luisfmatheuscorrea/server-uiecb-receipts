const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('user').count();

    const user = await connection('user')
      .limit(8)
      .offset((page - 1) * 8)
      .select('user.*')
      .orderBy('name', 'asc')
      .modify(function(queryBuilder) {
        if (request.query.nameFilter !== "") {
          queryBuilder.where("name", "like", `%${request.query.nameFilter}%`)
        }
      })


    return response.json(user);
  },

  async create(request, response) {
    const { name } = request.body;

    // const numeration = crypto.randomBytes(4).toString('HEX');
    
    await connection('user').insert({
      sender
    })

    return response.json(user);
  },

  async delete(request, response) {
    const { id } = request.params;

    const user = await connection('user')
      .where('id', id)
      .select('id')
      .first();

    await connection('user').where('id', id).delete();

    return response.status(204).send();
  }
};