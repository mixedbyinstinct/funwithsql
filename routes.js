const mysql = require('mysql');

module.exports = function(app) {
  app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
  });

  app.post('/search', (req, res) => {
    let sql = `SELECT video_link FROM tumbzilla_labels WHERE categories = ?`;
    let query = req.body.query;
    
    let con = mysql.createConnection({
      host: 'mysql.funwithsql.instinctmxd.com',
      user: 'databseinstinct',
      password: 'flamingo-22',
      database: 'noaardudb'
    });
    
    con.connect(function(err) {
      if(err) res.json({message: err});
      
      con.connect(sql, query, function(err, result) {
        if(err) res.json({message: err});
        
        res.json({
          message: 'success',
          videos: result
        })
      })
    })
  })

}