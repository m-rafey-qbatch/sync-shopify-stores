import dbConnect from "../../database/connection.js";
import ShopifySessions from "../../database/models/shopify_sessions.js";
import shopify from "../../shopify.js";
dbConnect();

export const processSqsMessage = async (req, res) => {
  try {
    const store = "cocomo001.myshopify.com";
    const sessions = await ShopifySessions.find({});
    const getNestedData = (obj) => obj.edges.map((x) => x.node);

    // console.log(sessions)
    const sku = "asd";

    const storesToBeUpdated = sessions.filter((x) => x.shop === store);
    // const storesToBeUpdated = sessions

    const result = [];

    function simplifyGraphQLResponse(response) {
      if (Array.isArray(response)) return response.map(simplifyGraphQLResponse);
      else if (typeof response === "object" && response !== null) {
        if ("edges" in response) return simplifyGraphQLResponse(response.edges);
        else if ("node" in response)
          return simplifyGraphQLResponse(response.node);
        else {
          let simplified = {};
          for (let key in response)
            simplified[key] = simplifyGraphQLResponse(response[key]);

          return simplified;
        }
      } else return response;
    }

    for (const session of storesToBeUpdated) {
      const client = new shopify.api.clients.Graphql({ session });

      const { body } = await client.query({
        data: {
          query: `{ product: products(first: 1,  query:"(sku:${sku})" ) {
            edges {
              node {
                id
                title
                totalInventory
                variants (first:20){
                  edges {
                    node {
                      id
                      title
                      inventoryQuantity
                      sku
                      inventoryItem {
                        id
                        inventoryHistoryUrl
                        inventoryLevels(first:5) {
                          edges {
                            node {
                              id
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
      const inventoryLevel =
        data?.product?.[0]?.variants?.[0]?.inventoryItem?.inventoryLevels?.[0]
          ?.id;

      if(inventoryLevel){

      }
      console.log("*".repeat(100))
      const temp = {
        ...(body?.data?.product?.edges?.[0]?.node || []),
        store: session.shop,
        variants: getNestedData(
          body?.data?.product?.edges?.[0]?.node?.variants || {}
        ),
      };
      result.push(temp);

      // update the count

      await client.query({
        data: {
          query: `mutation AdjustInventoryQuantity($input: InventoryAdjustQuantityInput!) {
            inventoryAdjustQuantity(input: $input) {
              inventoryLevel {
                id
                available
                incoming
                item {
                  id
                  sku
                }
                location {
                  id
                  name
                }
              }
            }
          }
          `, variables: {
            "input": {
              "inventoryLevelId": temp.variants[0].id,
              "availableDelta": 3
            }
          }
          ,
        },
      });
      console.log(result);
      return res.status(200).json({ inventoryLevel });
    }
  } catch (e) {
    console.log("*".repeat(100));
    console.log(e);
  }
};
