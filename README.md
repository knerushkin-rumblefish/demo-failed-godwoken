## Install
Install all necessary npm dependencies:
```
yarn
```

## Build
```
yarn build
```
> To build Vyper contracts you need python virtual env and run:\
`python3 -m venv env`\
`source env/bin/activate `\
before runing `yarn build`

## Deploy
### Config
#### Ganache
For `Ganache` deployment make sure you've run `yarn ganache` and set `export DEPLOYMENT_ENV=ganache`.\
For `Godwoken` deployment make sure you've run Godwoken with [godwoken-kicker](https://github.com/RetricSu/godwoken-kicker/) and `export DEPLOYER_PRIVATE_KEY={PRIVATE_KEY}`\
\
Run deploy with

```
yarn deploy
```

Output:
```
deploy
stupid 0x3194cBDC3dbcd3E11a07892e7bA5c3394048Cc87
simple 0x602C71e4DAC47a042Ee7f46E0aee17F94A3bA0B6
```
Simple Stupid Deploy
Copy addresses to `scripts/simple-stupid-contract-interaction/address.ts`

Pool Contract Deploy
Addresses are replaced in addresses.{network}.json files accordingly to `DEPLOYMENT_ENV`

## Test
```
yarn test
```


# Error Description
Currently inter Contract call's are failing when called in loop

### GODWOKEN-KICKER CONFIG

```
GODWOKEN_GIT_URL=https://github.com/nervosnetwork/godwoken.git
GODWOKEN_GIT_CHECKOUT=v0.6.2-rc1
POLYMAN_GIT_URL=https://github.com/RetricSu/godwoken-polyman.git
POLYMAN_GIT_CHECKOUT=v0.6.1-rc1
WEB3_GIT_URL=https://github.com/nervosnetwork/godwoken-web3.git
WEB3_GIT_CHECKOUT=v0.6.0-rc4
SCRIPTS_GIT_URL=https://github.com/nervosnetwork/godwoken-scripts.git
SCRIPTS_GIT_CHECKOUT=v0.8.0-rc2
POLYJUICE_GIT_URL=https://github.com/nervosnetwork/godwoken-polyjuice.git
POLYJUICE_GIT_CHECKOUT=fix-inner-call-revert
CLERKB_GIT_URL=https://github.com/nervosnetwork/clerkb.git
CLERKB_GIT_CHECKOUT=v0.4.0
```
#### Simple Stupid Example
Deployment has no problem either for SOL or VY.
Tests has no problem for SOL, in case of VY every contract call is failing.
Tests for VY contracts failing for every method call.
Error's:
```
failed to send gw_executeRawL2Tranaction rpc, {"jsonrpc":"2.0","id":"bc2a16c9-a13c-4cca-8cb4-82667a3152c6","error":{"code":0,"message":"invalid exit code 2"}}
```
```
processing response error (body="{\"jsonrpc\":\"2.0\",\"id\":51,\"error\":{\"code\":0,\"message\":\"invalid exit code 2\"}}", error={"code":0}, requestBody="{\"method\":\"gw_submit_l2transaction\",\"params\":[\"0xcd0000000c000000880000007c00000014000000180000001c00000020000000040000000d0000001900000058000000ffffff504f4c5900001bb700000000000000000000000000000000000000000000000000000000000000000000000000240000009f52100c000000000000000000000000b01316c53c91da3ccd593c04091615193886851941000000d4db6bb30b900e41cf0d9970095c6ecf54cb6ca2a9e3848bf0653ccca4f3a8b92bf9c19269d83d406a3feb6f424656c93b93db7da8df0995f5bc547ee40dda4d00\"],\"id\":51,\"jsonrpc\":\"2.0\"}", requestMethod="POST", url="http://localhost:8024", code=SERVER_ERROR, version=web/5.4.0)

```

All error's are visible on WEB3 - no blocking error's on godwoken not visible from application. 