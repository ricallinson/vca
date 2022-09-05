const assert = require('assert');
const api = require('../libs/config-parser');

describe('vlan', function() {

    it('should load all files in fixtures directory into a string', function() {
        let data = api.readDirFilesToString('./fixtures');
        assert.equal(data.length, 994);
    });

    it('should parse vlans', function() {
        let vlans = api.parseVlans('./fixtures/vlan1.txt');
        console.log(vlans[0]);
        assert.equal(vlans.length, 33);
    });
});
