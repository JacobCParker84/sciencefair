const after = require('lodash/after')

module.exports = (data, state, send, done) => {
  const alldone = after(state.datasources.length, done)

  Object.keys(state.datasources).forEach((name) => {
    const source = state.datasources[name]

    source.search(query, { pageSize: 1000 }, (err, results) => {
      if (err) console.log(err)

      if (results) {
        send('results_recieve', results, alldone)
      } else {
        send('results_none', name)
      }
    })
  })
}