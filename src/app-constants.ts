export const APP_CONSTANTS = {
  SET_RPAY_FLOW: 'setRpayFlow',
  KEY_RPAY_CONFIGURATION: 'getRpayConfiguration',
  KEY_PUBLIC_ITEMS: 'publicItemsStore/getPublicItems',
  KEY_MODAL_MESSAGE: 'getModalMessage',
  KEY_WAITING_IMAGE: 'contentStore/getWaitingCSS',

  KEY_TARGET_FILE_FOR_DISPLAY: 'rpayStacksContractStore/getTargetFileForDisplay',
  KEY_MY_ITEMS: 'myItemStore/getMyItems',
  KEY_MY_ITEM: 'myItemStore/myItem',
  KEY_ITEM_VALIDITY: 'myItemStore/getItemValidity',

  KEY_PROFILE: 'rpayAuthStore/getMyProfile',
  KEY_GAIA_STORAGE: 'rpayAuthStore/getMyProfile',
  KEY_ACCOUNT_INFO: 'rpayAuthStore/getAccountInfo',
  KEY_ACCOUNTS: 'rpayAuthStore/getAccounts',

  KEY_BIDDING_CURRENT_BID: 'rpayPurchaseStore/getCurrentBid',
  KEY_BIDDING_NEXT_BID: 'rpayPurchaseStore/getNextBid',
  KEY_SALES_BUTTON_LABEL: 'rpayPurchaseStore/getSalesButtonLabel',
  KEY_SALES_BADGE_LABEL: 'rpayPurchaseStore/getSalesBadgeLabel',
  KEY_SALES_INFO_TEXT: 'rpayPurchaseStore/getSalesInfoText',
  KEY_FORMATTED_BIDDING_END_TIME: 'rpayPurchaseStore/getFormattedBiddingEndTime',

  KEY_GAIA_ASSET_BY_HASH: 'rpayStacksContractStore/getGaiaAssetByHash',
  KEY_GAIA_ASSETS: 'rpayStacksContractStore/getGaiaAssets',
  KEY_GAIA_ASSETS_BY_OWNER: 'rpayStacksContractStore/getGaiaAssetsByOwner',
  KEY_REGISTRY: 'rpayStacksContractStore/getRegistry',
  KEY_TRADE_INFO_FROM_HASH: 'rpayStacksContractStore/getTradeInfoFromHash',
  KEY_APPLICATION_FROM_REGISTRY_BY_CONTRACT_ID: 'rpayStacksContractStore/getApplicationFromRegistryByContractId',
  KEY_ASSET_FROM_CONTRACT_BY_HASH: 'rpayStacksContractStore/getAssetFromContractByHash',
  KEY_ASSETS_BY_CONTRACT_ID: 'rpayStacksContractStore/getAssetsByContractId',
  KEY_ASSETS_BY_CONTRACT_ID_AND_OWNER: 'rpayStacksContractStore/getAssetsByContractIdAndOwner',
  KEY_ASSET_TRANSACTIONS: 'rpayStacksContractStore/getAssetTransactions',
  KEY_ASSET_LAST_TRANSACTION: 'rpayStacksContractStore/getAssetLastTransaction',
  KEY_ASSET_TRANSACTION: 'rpayStacksContractStore/getAssetTransaction',

  SET_CURRENT_SEARCH: 'rpaySearchStore/setCurrentSearch',
  KEY_CURRENT_SEARCH: 'rpaySearchStore/getCurrentSearch',
  KEY_ASSET: 'rpaySearchStore/getAsset',
  KEY_SEARCH_RESULTS: 'rpaySearchStore/getSearchResults'
}
