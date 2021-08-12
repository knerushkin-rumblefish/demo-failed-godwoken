## Build
```yarn build```
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

```yarn deploy```

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
``` yarn test```