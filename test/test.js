var {assert,should,expect} = require('chai');
var {client} = require('../index.js');
var {token} = require('../config.json');

describe('#bot', () => {

    before(() => {
        client.login(token)
    });

    it('should be SyiBot#4814', () => {

        expect('SyiBot#4814').to.equal('SyiBot#4814');
    });
});
