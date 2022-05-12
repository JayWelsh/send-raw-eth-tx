const ethers = require('ethers');

const sendTx = async () => {

  // tx config
  const nonce = '13643'; // nonce of tx that you want to replace
  const gasPriceInGwei = '100'; // WARNING: make sure to use the Gwei value here, don't use wei or it will be very expensive, 100 = 100 gwei
  const data = "";

  // Wallet / Provider config
  let apiKey = ''; // Infura key / Project ID
  let privateKey = ''; // Wallet private key

  const provider = await new ethers.providers.InfuraProvider("homestead", apiKey); // homestead = mainnet, can also use e.g. rinkeby
  const wallet = await new ethers.Wallet(privateKey).connect(provider);

  // Warning config
  const maxGasPriceGwei = 200; // suggest leaving this the same unless gas is 200+ and tx is urgent

  if(Number(gasPriceInGwei) <= maxGasPriceGwei) {

    const gasPriceInWei = ethers.utils.parseUnits(gasPriceInGwei, "gwei")

    let tx = await wallet.sendTransaction({data, nonce, gasPrice: gasPriceInWei})

    console.log("Tx broadcast, awaiting on-chain confirmation")

    let response = await tx.wait();

    console.log(`Completed tx: ${tx.hash}`)
    console.log(`Contract deployed to: ${response.contractAddress}`)

  } else {
    console.log(`You are setting a very high gas price, please make sure it is correct, remember to set the gas price in GWEI and not WEI, if you are sure you want to use the current gas price then please increase the value of maxGasPriceGwei`);
  }

}

sendTx();