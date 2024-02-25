const express = require('express');
const userRoutes = require('./src/routes/user.route')
const newsRoutes = require('./src/routes/news.route')
const app = express();
const port = 3000;

const { authMiddleware } = require('./src/middlewares/auth.middleware')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes)
app.use('/news', authMiddleware, newsRoutes)

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});


module.exports = app;