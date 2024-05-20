import { BrowserWallet } from '@meshsdk/core';

document.getElementById('connect-wallet').addEventListener('click', async () => {
  try {
    const wallet = await BrowserWallet.enable('eternl');
    const assets = await wallet.getAssets();
    displayNFTs(assets);
  } catch (error) {
    console.error('Error connecting to wallet:', error);
  }
});

function displayNFTs(assets) {
  const nftContainer = document.getElementById('nft-container');
  nftContainer.innerHTML = '';

  assets.forEach(asset => {
    if (asset.assetName && asset.policyId) {
      const nftItem = document.createElement('div');
      nftItem.className = 'nft-item';

      const nftImage = document.createElement('img');
      nftImage.src = `https://cardanoscan.io/images/${asset.policyId}.${asset.assetName}.png`;
      nftImage.alt = asset.assetName;

      const nftTitle = document.createElement('h3');
      nftTitle.textContent = asset.assetName;

      nftItem.appendChild(nftImage);
      nftItem.appendChild(nftTitle);
      nftContainer.appendChild(nftItem);
    }
  });
}
