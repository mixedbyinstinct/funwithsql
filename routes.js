const mysql = require('mysql');

module.exports = function(app) {
  app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname       });
  });
  
  app.post('/search', (req, res) => {
    console.log(req.body);
    let valid = /^((\d\d\d\d)\-+(\d\d)\-+(\d\d))/.test(req.body.query);
    if(!valid) {
      return res.json({
        message: 'Bad Format';
      })
    }
    let con = mysql.createConnection({
      host: 'mysql.funwithsql.instinctmxd.com',
      user: 'databseinstinct',
      password: 'flamingo-22',
      database: 'noaardudb'
    });
    con.connect(function(err) {
      if(err) return res.json({message: err});
      let sql = `SELECT FROM rdu WHERE (date = ?)`;
      con.query(sql, req.body.query, function(err, result) {
        if(err) return res.json({message: err});
        res.json({
          message: 'search succeeded',
          output: result
        })
      })
    })
  })
}