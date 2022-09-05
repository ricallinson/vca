const assert = require('assert');
const api = require('../libs/searcher');

describe('searcher', function() {

    it('should return all matches', function() {
        let data = api.search('./fixtures/vlan1.txt', api.parseQueryString('1/1/1'));
        // console.log(data[0].u1);
        assert.equal(data.length, 17);
    });

    it('should return all matches filter to tag data', function() {
        let data = api.listQtags('./fixtures/vlan1.txt', api.parseQueryString('2/1/21'));
        console.log(data);
        assert.equal(data.length, 2);
    });
});
