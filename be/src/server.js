//load env variables, for development, not production
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}



const app = require('./app');

//creates port 5000
app.listen(process.env.PORT, () => console.log('Running on port 5000')); 
