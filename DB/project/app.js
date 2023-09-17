const mysql = require('mysql2');

const con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '123123',
    database : 'hospital'
});

con.connect();

function processCommand(command) {
    if(command[0] === 'i')
    {
        const insert = `INSERT INTO hosp (hosp_name) values ('즐거운 병원')`;
        con.query(insert,(err, res) => {
            if(err) throw err;
            console.log('insert 성공!');
        });
    }
    else if(command[0] === 'd')
    {
        const del = 'DELETE FROM hosp order by hosp_name desc limit 1';
        con.query(del,(err,res) => {
            if(err) throw err;
            console.log('del 성공!');
        });
    }
    else if(command[0] === 's')
    {
        const sel = 'SELECT * FROM hosp';
        con.query(sel,(err,res) => {
            if(err) throw err;
            console.log(res);
        });
    }
    else if(command[0] === 'u')
    {
        const upd = `UPDATE hosp SET hosp_name = "나의 병원" order by hosp_name desc limit 1`;
        con.query(upd,(err,res) => {
            if(err) throw err;
            console.log('업데이트 성공');
        });
    }
}

process.stdin.on('data', (data) => {
    const command = data.toString().trim();
    processCommand(command);
});
  
  // 데이터베이스 연결 종료
  process.on('exit', () => {
    connection.end();
  });