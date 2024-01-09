import dbConnect from "../../database/connection.js";
import ShopifySessions from "../../database/models/shopify_sessions.js";
import shopify from "../../shopify.js";

dbConnect();
const MAX_RETRIES = 5;
let tries = 1;
const CANCEL_STATUSES = ["partially_refunded", "refunded"];

export const processSqsMessage = async (req, res) => {
  while (tries <= MAX_RETRIES) {
    try {
      const body = req.body;
      const store = body?.shop;
      console.log(`Getting session for store: ${store}`);
      console.log(`Processing payload: ${JSON.parse(body.payload)}`);
      const session = (await ShopifySessions.find({shop:store}))?.[0];
      console.log(`Session from mongoDB: ${session}`);
      const lineItems = body?.payload?.line_items;

      const client = new shopify.api.clients.Graphql({ session });

      for (const item of lineItems) {
        // handle the cancel orders and add the quantity
        let qty = -+item.quantity;
        if (
          CANCEL_STATUSES.includes(body?.payload?.financial_status) ||
          body?.payload?.cancelled_at?.length
        )
          qty = +item.quantity;
        await updateQuantity(item.sku, qty, client);
      }
      return endResponse(res);
    } catch (e) {
      console.log(e);
      console.log(
        `Total Tries: ${tries} -  ${tries < MAX_RETRIES ? "Retrying.." : ""}`
      );
      tries++;
    }
  }
  return endResponse(res);
};

const endResponse = async (res) => {
  return res.status(200).json({ success: true });
};

const updateQuantity = async (sku, quantity, client) => {
  console.log("Fetching Data..");
  const { body } = await client.query({
    data: {
      query: `{product: products(first: 1, query:"(sku:${sku})") {
        edges {
          node {
            id
            title
            totalInventory
            variants (first:1){
              edges {
                node {
                  id
                  title
                  inventoryQuantity
                  sku
                  inventoryItem {
                    id
                    inventoryLevels(first:1) {
                      edges {
                        node {
                          id
                          location {
                            id
                            name
                          }
                        }
                      }
                    } 
                  }
                }
              }
            }
          }
        }
      }
    }`,
    },
  });

  const { data } = simplifyGraphQLResponse(body);
  const inventoryLevel = data?.product?.[0]?.variants?.[0]?.inventoryItem;
  const inventoryLevelId = inventoryLevel?.id;
  const locationId = inventoryLevel?.inventoryLevels?.[0].location?.id;

  if (inventoryLevelId && locationId) {
    await client.query({
      data: {
        query: `mutation inventoryAdjustQuantities($input: InventoryAdjustQuantitiesInput!) {
          inventoryAdjustQuantities(input: $input) {
            userErrors {
              field
              message
            }
            inventoryAdjustmentGroup {
              createdAt
              reason
              changes {
                name
                delta
              }
            }
          }
        }            
        `,
        variables: {
          input: {
            reason: "other",
            name: "available",
            changes: [
              {
                delta: quantity,
                inventoryItemId: inventoryLevelId,
                locationId: locationId,
              },
            ],
          },
        },
      },
    });
  }
};

function simplifyGraphQLResponse(response) {
  if (Array.isArray(response)) return response.map(simplifyGraphQLResponse);
  else if (typeof response === "object" && response !== null) {
    if ("edges" in response) return simplifyGraphQLResponse(response.edges);
    else if ("node" in response) return simplifyGraphQLResponse(response.node);
    else {
      let simplified = {};
      for (let key in response)
        simplified[key] = simplifyGraphQLResponse(response[key]);

      return simplified;
    }
  } else return response;
}
