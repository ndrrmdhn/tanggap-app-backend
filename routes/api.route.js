const adminRoute = require('./admin.route');
const aduanRoute = require('./aduan.route');
const beritaRoute = require('./berita.route');

module.exports = function(app,urlApi){
    app.use(urlApi,adminRoute);
    app.use(urlApi,aduanRoute);
    app.use(urlApi,beritaRoute);
}