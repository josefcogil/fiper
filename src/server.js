const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const exphbs  = require('express-handlebars');

const PORT = process.env.PORT || 3000;

app.use(cors());

// Body Parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Views path
app.set('views', path.join(__dirname, 'public/views'))

// Set template engine
app.engine('.hbs', exphbs({extname: '.hbs', layout: 'main.hbs'}));
app.set('view engine', '.hbs');

// Serve landing page
app.get('/', (req, res) => {
    res.render('landing');
});

// Routes Array
const routes = [
    'signup'
]

// Require routes
const setRoute = routes => {
    routes.forEach(route => {
        app.use(`/${route}`, require(`./routes/${route}`));
    })
}

setRoute(routes);

// Init server
app.listen(PORT, () => console.log(`App running on port ${PORT}`));