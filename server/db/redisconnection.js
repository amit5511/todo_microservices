const Redis = require("ioredis");

const redisOptions = {
  host:process.env.redis_Host,
  port: process.env.redis_port,
  password:process.env.redis_password
};

// Create a Redis client
const redis = new Redis(redisOptions);
redis.on('connect', function() {
    console.log('<<<redis server online>>>');
});
redis.on('error', function(err) {
    console.log('<<redis connection error>>',err);
});

const setRedisKey =async(data)=>{
    try {
        await redis.set('FULLSTACK_TASK_ATUL',JSON.stringify(data))
    }catch (error) {
        console.log("Error during saving data in redis : ",error);
    }
}
const getRedisKey =async()=>{
    try {
        const data= await redis.get('FULLSTACK_TASK_ATUL')
        if(data){
            return JSON.parse(data);
        }
    }catch (error) {
        console.log("Error during fetching data from redis : ",error);
    }
};

const clearreddis=async()=>{
    try {
         return await redis.del('FULLSTACK_TASK_ATUL')
    } catch (error) {
        console.log("Error during flush redis : ",error);
    }
}
module.exports ={
    setRedisKey,
    getRedisKey,
    clearreddis
}
