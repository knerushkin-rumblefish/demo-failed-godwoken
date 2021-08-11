## Build
```yarn build```


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
Copy addresses to `scripts/simple-stupid-contract-interaction/address.ts`

## Test
``` yarn test```