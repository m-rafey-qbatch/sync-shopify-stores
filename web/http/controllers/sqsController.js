import dbConnect from "../../database/connection.js";
import ShopifySessions from "../../database/models/shopify_sessions.js"
import shopify from "../../shopify.js"
dbConnect();


export const processSqsMessage = async (req, res) => {
  try {
    const store = "cocomo001.myshopify.com"
    const sessions = await ShopifySessions.find({})
    // console.log(sessions)


    const storesToBeUpdated = sessions.filter(x => x.shop !== store)

    for (const session of storesToBeUpdated) {
      const client = new shopify.api.clients.Graphql({ session });
      console.log(client)

// https://shopify.dev/docs/api/admin-graphql/2023-10/mutations/inventoryAdjustQuantity#examples-Increase_the_available_inventory_of_an_item_at_a_location_by_3
    }
    return res
      .status(200)
      .json({ body: req.body });;



  } catch (e) {
    console.log('*'.repeat(100))
    console.log(e)
  }


}







