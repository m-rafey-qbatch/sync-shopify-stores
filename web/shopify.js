import { BillingInterval, LATEST_API_VERSION } from "@shopify/shopify-api";
import { shopifyApp } from "@shopify/shopify-app-express";
import { MongoDBSessionStorage } from "@shopify/shopify-app-session-storage-mongodb";
import { restResources } from "@shopify/shopify-api/rest/admin/2023-04";

import { DB_CONFIG } from "./utils/constants.js";
console.log('*********************')
console.log(DB_CONFIG.CONN_STRING)

const shopify = shopifyApp({
  api: {
    apiVersion: LATEST_API_VERSION,
    restResources,
    billing: undefined, // or replace with billingConfig above to enable example billing
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  webhooks: {
    path: "/api/webhooks",
  },
  // This should be replaced with your preferred storage strategy

  // sessionStorage: new MongoDBSessionStorage(DB_CONFIG.CONN_STRING, DB_CONFIG.NAME),
  sessionStorage: new MongoDBSessionStorage("mongodb+srv://danperlmanprog:YXKnG8S0NE4kVapI@inventory-app.strew6i.mongodb.net/sync-stores", "sync-stores"),

});

export default shopify;
