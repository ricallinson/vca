const api = require('../libs/config-parser');

exports.parseQueryString = function(str) {
    let q = str.split('/');
    return {
        slot:   `u${q[0].trim()}`,
        module: `m${q[1].trim()}`,
        port:   q[2].trim()
    };
};

exports.search = function(dir, query) {
    let vlans = api.parseVlans(dir);
    let matches = [];
    vlans.forEach((vlan) => {
        if (vlan[query.slot] && vlan[query.slot][query.module] && vlan[query.slot][query.module][query.port]) {
            matches.push(vlan);
        }
    });
    return matches;
};

exports.listQtags = function(dir, query) {
    let result = [];
    this.search(dir, query).forEach((match) => {
        result.push({
            id:    match.id,
            name:  match.name,
            qtags: match[query.slot][query.module][query.port]
        });
    });
    return result;
};
