var configValues = require ('./config.json');

module.exports = {
    getDbConnectionString: function (){
        return `mongodb://${configValues.username}:${configValues.password}@ds237989.mlab.com:37989/nodenhan`;
    }
}