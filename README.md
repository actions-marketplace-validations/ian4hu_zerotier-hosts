# zerotier-hosts action

This action allows you retrive all hosts(members) in a specific zerotier network.

## Inputs

## `network-id`

**Required** The network ID. You network ID can be found in [ZeroTier Networks](https://my.zerotier.com/network)

## `api-access-token`

**Required** The API Access token for zerotier API. You can generate it from [ZeroTier Account](https://my.zerotier.com/account)

## `format`

**Required** The hosts info output format. Can be `plain` or `json`. Default it is `plain`.


## Outputs

## `hosts`

The hosts info of zerotier network.

## Example Usage

```yaml
  - name: zerotier-hosts action step
    uses: ian4hu/zerotier-hosts@latest # Uses an action in the root directory
    id: plain
    with:
        network-id: ${{ secrets.NETWORK_ID }}
        api-access-token: ${{ secrets.API_ACCESS_TOKEN }}
        format: 'plain'
    # Use the output from the `hello` step
  - name: Get the output hosts
    run: echo "The hosts was ${{ steps.plain.outputs.hosts }}"
  - name: zerotier-hosts action step
    uses: ian4hu/zerotier-hosts@latest # Uses an action in the root directory
    id: json
    with:
        network-id: ${{ secrets.NETWORK_ID }}
        api-access-token: ${{ secrets.API_ACCESS_TOKEN }}
        format: 'json'
    # Use the output from the `hello` step
  - name: Get the output hosts
    run: echo "The hosts was ${{ steps.json.outputs.hosts }}"
```