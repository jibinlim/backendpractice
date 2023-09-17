// const mongoose = require('mongoose');
// const User = require('./User');
// mongoose.connect('mongodb://localhost:27017//bookstore');
// const user = new User({name:'jib',age:28});
// user.save().then(() => console.log('새로운 유저가 생성됨'));

//프로미스로
const mongoose = require('mongoose');
const User = require('./User');
mongoose.connect("mongodb://127.0.0.1:27017/testdb");

run();
async function run(){
    // const user = await User.create({name:'Park',age:30});
    // console.log(user);
    try{
    // const user = await User.create({
    //     name:"Hong",
    //     age:27,
    //     email: 'Test@company.co.kr',
    //     hobbies: ['Weight Lifting','Bowling'],
    //     address:{city: 'Jeju', street :'kangdam-1dong'} 
    // })
    // await user.save();
    // const user= await User.deleteOne({name :'Lee'}) ;
    // const user = await User.exists({name:"Lee"} );
    // const user = await User.findOne({ name :'Kang'})
    // const user = await User.find({ name :'Kang'})
    //const user = await User.where('name').equals('Park') 
    const user = (await User.where('age').gt(20)).lt(40).where('name').equals('Park')
    console.log(user);
} catch(e){
    console.log(e.message);
}
}

// async function run(){
// const user = new User({name : "Kang",age:28});
// await user.save();
// console.log(user);
// }