const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('receipts').count();

    const receipts = await connection('receipts')
      .limit(8)
      .offset((page - 1) * 8)
      .select('receipts.*')
      .orderBy('numeration', 'desc')
      .modify(function(queryBuilder) {
        if (request.query.senderFilter !== "") {
          queryBuilder.where("sender", "like", `%${request.query.senderFilter}%`)
        }
        if (request.query.dateFilter !== "") {
          queryBuilder.where("sender", "like", `%${request.query.dateFilter}%`)
        }
      })


    return response.json(receipts);
  },

  async create(request, response) {
    const { sender, departments, receivement, value, debit, credit, date, referring, observation } = request.body;

    // const numeration = crypto.randomBytes(4).toString('HEX');
    
    await connection('receipts').insert({
      sender,
      departments,
      receivement,
      value,
      debit,
      credit,
      date,
      referring,
      observation,
    })

    return response.json(departments);
  },

  async delete(request, response) {
    const { numeration } = request.params;

    const receipt = await connection('receipts')
      .where('numeration', numeration)
      .select('numeration')
      .first();

    // if (receipt.info_numeration !== info_numeration) {
    //   return response.status(401).json({ error: 'Operação não permitida.' });
    // }

    await connection('receipts').where('numeration', numeration).delete();

    return response.status(204).send();
  }
};