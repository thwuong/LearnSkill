const authRouter = require('./auth');
const postsRouter = require('./posts');
// const siteRouter = require('./site');
function route(app){
    app.use('/api/auth', authRouter);
    app.use('/api/posts',postsRouter);
}
module.exports = route;