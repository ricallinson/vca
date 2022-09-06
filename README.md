# vca

A simple VLAN configuration analysis tool for Foundry/Brocade/Ruckus switches.

## Development Setup

Requires [Nodejs](https://nodejs.org/en/).

```
git clone git@github.com:ricallinson/vca.git
cd ./vca
npm i
```

## CLI Use

[Leon to provide instructions.]

```
vca ./path/to/source <slot>/<module>/<port>
```

### ./path/to/source

[Leon to provide instructions.]

### slot

[Leon to provide instructions.]

### module

[Leon to provide instructions.]

### port

[Leon to provide instructions.]

### Example

```
> ./bin/vca ./fixtures/vlan1.txt 2/1/3
/Users/ricallinson/Js/vca/fixtures/vlan1.txt
[
	{
		"id": "60",
		"name": "VLAN-SIX",
		"qtags": [
			"untagged"
		]
	}
]
```
