//Requiring path and fs modules.
const path = require('path');
const fs = require('fs');

function parseIntArray(arr) {
    let result = [];
    arr.forEach((item) => {
        item = item.trim();
        if (parseInt(item) == item) {
            result.push(parseInt(item));
        }
    });
    return result;
}

exports.readDirFilesToString = function(dir) {
    // Reading all file names into an array.
    let files = fs.readdirSync(dir);
    // Reading all files into a string using forEach.
    let data;
    files.forEach(function(file) {
        data += fs.readFileSync(path.join(dir, file), 'utf8');
    });
    return data.split(/\r?\n/);
};

exports.readFileToString = function(file) {
    let data = fs.readFileSync(path.join(file), 'utf8');
    return data.split(/\r?\n/);
};

exports.parseVlanHeader = function(line) {
    let parts = line.split(',');
    return {
        id:           parts[0].trim().split(' ')[1],
        name:         parts[1].trim().split(' ')[1],
        priority:     parts[2].trim().split(' ')[1],
        spanningTree: parts[3].trim().split(' ')[2] || parts[3].trim().split(' ')[0],
        ports:        {}
    };
};

exports.parseVlanPorts = function(vlan, name, value) {
    if (value === 'None') {
        return;
    }
    let parts = value.split(')');
    let slot = parts[0].substring(1, parts[0].indexOf('/')).toLowerCase();
    let mod = parts[0].substring(parts[0].indexOf('/')+1).toLowerCase();
    vlan[slot] ? null : vlan[slot] = {};
    vlan[slot][mod] ? null : vlan[slot][mod] = {};
    let ports = parseIntArray(parts[1].split(' '));
    ports.forEach((port) => {
        vlan[slot][mod][port] ? null : vlan[slot][mod][port] = [];
        vlan[slot][mod][port].push(name);
    });
};

exports.parseVlanDetail = function(vlan, line) {
    if (!line.trim()) {
        return;
    }
    let parts = line.split(':');
    let name = parts[0].trim().toLowerCase().replaceAll(/[\W_]+/g, '_');
    let value = parts[1].trim();
    if (name.includes('ports')) {
        this.parseVlanPorts(vlan, name.substring(0, name.length-6), value);
    } else if (value) {
        vlan[name] = value;
    }
};

exports.parseVlans = function(dir) {
    let vlans = [];
    let lines = this.readFileToString(dir);
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('PORT-VLAN')) {
            vlans.push(this.parseVlanHeader(lines[i]));
        }
        if (lines[i].startsWith(' ')) {
            this.parseVlanDetail(vlans[vlans.length-1], lines[i]);
        }
    }
    return vlans;
};
