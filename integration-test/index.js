const userContext = require('./user-context');
const adminContext = require('./admin-context');
const config = require('../config/config');

describe('API Integration test',function(){
    describe('user-context',userContext);
    if(config.adminContext.hasContext)
    {
        describe('admin-context',adminContext);
    }
});

