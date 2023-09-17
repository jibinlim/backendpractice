const mysql = require('mysql2');

const con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '123123',
    database : 'game'
});

con.connect();

    function pick_num() {
    let num = [];
    while(num.length < 4)
    {
     let random = Math.floor(Math.random() * 10);
        if(num.indexOf(random) === -1)
          num.push(random);
    }
    return (num);
}

function to_array(n)
{
    let arr = [];
    for(let i = 3; i >= 0; i--)
    {
        arr[i] = n % 10;
        if(isNaN(arr[i]))
            return false;
        n = Math.floor(n/10);
    }
    return (arr);
}

function print_strike_ball(arr,num)
{
    let strike = 0;
    let ball = 0;
    for(let i = 0; i < 4; i++)
    {
        if(num.indexOf(arr[i]) === i)
            strike++;
        else if(num.indexOf(arr[i]) !== -1)
            ball++;
    }
    if(strike === 4)
    {
        console.log('홈런!!!');
        return true;
    }
    console.log(`${strike}스트라이크,${ball}볼 입니다.`);
    return false;
}

function input_check(arr)
{
    let check = [];
    for(let i = 0; i < 10; i++)
        check[i] = 0;
    for(let i = 0; i < 4; i++)
    {
        check[arr[i]]++;
    }
    for(let i = 0; i < 10; i++)
        if(check[i] > 1)
            return false;
    return true;
}

function reset()
{
    count = 10;
    num = pick_num();
}
function hint()
{
    let ht = [];
    for(let i = 0; i < 4; i++)
        ht[i] = num[i];
    while(ht.length < 5)
    {
        let r = Math.floor(Math.random() * 10);
        if(ht.indexOf(r) === -1)
            ht.push(r);
    }
    ht.sort((a,b) => b - a);
    for(let i = 0; i < 5; i++)
        console.log(ht[i]);
}

var count = 10;
var num = pick_num();
console.log('숫자 야구 게임을 시작하겠습니다! 기회는 10회 입니다.');
while(count > 0)
{
    console.log(`${count}회 남았습니다.`);
    let val = prompt('숫자를 입력하세요(리셋 : r, 힌트 : h):');
    if(val === 'r')
      {
        reset();
        continue;
      }
    if(val === 'h')
       {
        hint();
        continue;
       }
    if(val.length !== 4)
    {
       console.log('4자리로 입력해주세요!')
       continue;
    }
    const inp = to_array(val);
    if(!inp)
    {
        console.log('숫자를 입력하세요!');
        continue;
    }
    if(!input_check(inp))
    {
        console.log('중복된 숫자는 입력하지마세요!');
        continue;
    }
    console.log(`입력된 숫자는 ${inp}입니다.`)
    var s_b = print_strike_ball(inp,num);
    if(s_b)
        break;
    count--;
}
if(!s_b)
{
    console.log(`횟수 초과!! 정답은 ${num}`);
    const insert = `INSERT game INTO game_res values ('${count}회 남기고 성공하였습니다')`;
    con.query(insert,(err,res) => {
        if(err) throw err;
        console.log('insert 성공');
    });
}
