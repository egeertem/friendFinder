const path = require('path');

module.exports = app => {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/home.html'));
    });

    app.get('/survey', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/survey.html'));
    });

    // If no matching route is found default to home
    app.use(function(req, res) {
        res.redirect('/');
    });
}