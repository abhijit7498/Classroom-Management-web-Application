const mongoose=require('mongoose')
const dbconnection = async () => {
    try {
        const database = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connection successful');
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};
module.exports=dbconnection