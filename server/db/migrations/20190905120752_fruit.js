exports.up = async function (knex) {
  return knex.schema.createTable('fruit', (table) => {
    table.increments('id')
    table.string('name')
  })
}

exports.down = async function (knex) {
  return knex.schema.dropTable('fruit')
}
