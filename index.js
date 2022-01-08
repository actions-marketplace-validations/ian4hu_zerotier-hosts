import fetch from "node-fetch"
const core = require('@actions/core')

async function queryHosts(token, networkId) {
    const members = await fetch(`https://my.zerotier.com/api/v1/network/${networkId}/member`, {
        method: 'GET',
        headers: {
            'Authorization': `bearer ${token}`
        }
    }).then(resp => resp.json())
    const hosts = []
    for (const member of members) {
        const {nodeId, name, config: {ipAssignments}} = member
        if (!ipAssignments) { continue }
        for (const ipAssignment of ipAssignments) {
            hosts.push({host: nodeId, address: ipAssignment})
            hosts.push({host: name, address: ipAssignment})
        }
    }
    return hosts
}

async function run() {
    try {
        const networkId = core.getInput('network-id');
        const apiAccessToken = core.getInput('api-access-token')
        const format = core.getInput('format')
        const hosts = await queryHosts(apiAccessToken, networkId)
        let output = JSON.stringify(hosts)
        if (format == 'plain') {
            output = hosts.map(h => `${h.host} ${h.address}`).join('\n')
        }
        core.setOutput('hosts', output)
    } catch (error) {
        core.setFailed(error.message);
    }
}

run()