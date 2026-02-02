/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('bots').del()
  await knex('bots').insert([
    { id: 1, name: 'Alex Chan', avatar: '/images/avatars/alex.png' },
    { id: 2, name: 'Emily Tan', avatar: '/images/avatars/emily.png' },
    { id: 3, name: 'Lucas Chen', avatar: '/images/avatars/lucas.png' },
    { id: 4, name: 'Sophia Lee', avatar: '/images/avatars/sophia.png' },
    { id: 5, name: 'Ben Carter', avatar: '/images/avatars/ben.png' },
    { id: 6, name: 'Chloe Garcia', avatar: '/images/avatars/chloe.png' },
    { id: 7, name: 'David Rodriguez', avatar: '/images/avatars/david.png' },
    { id: 8, name: 'Grace Kim', avatar: '/images/avatars/grace.png' },
  ])
}
