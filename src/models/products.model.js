const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products;',
  );
  console.log(products);
  return products;
};

const getById = async (id) => {
  const [[products]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?;',
    [id],
  );

  return products;
};

/* const create = async ({ question }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO questions (question) VALUES (?);',
    [question],
  );

  return { id: insertId, question };
};

const exclude = async (questionId) => {
  await connection.execute('DELETE FROM questions WHERE id = ?;', [questionId]);

  return true;
};

const isQuestionSimilar = async (question) => {
  const [questions] = await connection.execute(
    'SELECT * FROM questions WHERE replace(lcase(question), " ", "") = ?;',
    [question],
  );

  return questions.length > 0;
}; */

module.exports = { getAll, getById };