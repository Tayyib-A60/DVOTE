const routes = require('next-routes')();

routes
.add('/login', 'login')
.add('/signup', 'signup')
.add('/new', '/new/index')
.add('/elections/:address', '/elections/vote')
.add('/user/:id', 'user');
// .add('/campaigns/:address/requests/new', '/campaigns/requests/new')
// .add('/campaigns/:address/requests', '/campaigns/requests/index');

module.exports = routes;