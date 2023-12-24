// import shopify from "../shopify.js"
import dbConnect from "../database/connection.js";
import ShopifySessions from "../database/models/shopify_sessions.js"
dbConnect();

const payload = [
  {
    messageId: "cdf282ac-b4da-4b03-bc43-2ec384214423",
    receiptHandle:
      "AQEBm0DOhGHuBwmfk38m00a+J+O5Nx5Ax3G2h+sG5nOPdXJf/ef/3KMt0+8vLuVi3pA9AYfkGR/DDtCPo5hu8949sC+V3gURTjAaShYjvKkqASfv+6rTXDMQ6O0J2IN7/zDzkW+hnD6/rKIKc8URjW4NvU2LocJxh77/ETk5qgP0lxXo8I5CaSaRn6c7ADd93GGkjJcinYGztqjxTc9oa2bDcdBSfsgpQUOFjX0vef/GF1RZp5Z5oCM3QIJFuc8iBDCPAZ1fxM1NgmL41ELblF/qrKvKjtrZUOo1U8PSjs3ZGAw=",
    body: '{"shop":"cocomo001.myshopify.com","payload":{"id":5661331456318,"admin_graphql_api_id":"gid://shopify/Order/5661331456318","app_id":580111,"browser_ip":"101.50.68.115","buyer_accepts_marketing":false,"cancel_reason":null,"cancelled_at":null,"cart_token":"Z2NwLXVzLWVhc3QxOjAxSEo2QkRRRkJNRFZKOTYyQkhNQzlLU1o5","checkout_id":37222699434302,"checkout_token":"a69fb70b8b6402954823836b117fa976","client_details":{"accept_language":"en-PK","browser_height":null,"browser_ip":"101.50.68.115","browser_width":null,"session_hash":null,"user_agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"},"closed_at":null,"company":null,"confirmation_number":"LUW55WG65","confirmed":true,"contact_email":"asd@asd.com","created_at":"2023-12-21T09:11:28-05:00","currency":"PKR","current_subtotal_price":"749.95","current_subtotal_price_set":{"shop_money":{"amount":"749.95","currency_code":"PKR"},"presentment_money":{"amount":"749.95","currency_code":"PKR"}},"current_total_additional_fees_set":null,"current_total_discounts":"0.00","current_total_discounts_set":{"shop_money":{"amount":"0.00","currency_code":"PKR"},"presentment_money":{"amount":"0.00","currency_code":"PKR"}},"current_total_duties_set":null,"current_total_price":"869.94","current_total_price_set":{"shop_money":{"amount":"869.94","currency_code":"PKR"},"presentment_money":{"amount":"869.94","currency_code":"PKR"}},"current_total_tax":"119.99","current_total_tax_set":{"shop_money":{"amount":"119.99","currency_code":"PKR"},"presentment_money":{"amount":"119.99","currency_code":"PKR"}},"customer_locale":"en-PK","device_id":null,"discount_codes":[],"email":"asd@asd.com","estimated_taxes":false,"financial_status":"paid","fulfillment_status":null,"landing_site":"/?_ab=0&_fd=0&_sc=1","landing_site_ref":null,"location_id":null,"merchant_of_record_app_id":null,"name":"#1016","note":null,"note_attributes":[],"number":16,"order_number":1016,"order_status_url":"https://cocomo001.myshopify.com/71875002686/orders/8d1b4c18a00a0d0a6942a530bcc3460e/authenticate?key=3f5d3208c3a0eb8dc280317f9990266b","original_total_additional_fees_set":null,"original_total_duties_set":null,"payment_gateway_names":["bogus"],"phone":null,"po_number":null,"presentment_currency":"PKR","processed_at":"2023-12-21T09:11:26-05:00","reference":"eb587a7f22d16a4380b0e3be485d0f68","referring_site":"","source_identifier":"eb587a7f22d16a4380b0e3be485d0f68","source_name":"web","source_url":null,"subtotal_price":"749.95","subtotal_price_set":{"shop_money":{"amount":"749.95","currency_code":"PKR"},"presentment_money":{"amount":"749.95","currency_code":"PKR"}},"tags":"","tax_exempt":false,"tax_lines":[{"price":"119.99","rate":0.16,"title":"GST","price_set":{"shop_money":{"amount":"119.99","currency_code":"PKR"},"presentment_money":{"amount":"119.99","currency_code":"PKR"}},"channel_liable":false}],"taxes_included":false,"test":true,"token":"8d1b4c18a00a0d0a6942a530bcc3460e","total_discounts":"0.00","total_discounts_set":{"shop_money":{"amount":"0.00","currency_code":"PKR"},"presentment_money":{"amount":"0.00","currency_code":"PKR"}},"total_line_items_price":"749.95","total_line_items_price_set":{"shop_money":{"amount":"749.95","currency_code":"PKR"},"presentment_money":{"amount":"749.95","currency_code":"PKR"}},"total_outstanding":"0.00","total_price":"869.94","total_price_set":{"shop_money":{"amount":"869.94","currency_code":"PKR"},"presentment_money":{"amount":"869.94","currency_code":"PKR"}},"total_shipping_price_set":{"shop_money":{"amount":"0.00","currency_code":"PKR"},"presentment_money":{"amount":"0.00","currency_code":"PKR"}},"total_tax":"119.99","total_tax_set":{"shop_money":{"amount":"119.99","currency_code":"PKR"},"presentment_money":{"amount":"119.99","currency_code":"PKR"}},"total_tip_received":"0.00","total_weight":0,"updated_at":"2023-12-21T09:11:29-05:00","user_id":null,"billing_address":{"first_name":"asd","address1":"asd","phone":null,"city":"faisalabad","zip":"38000","province":null,"country":"Pakistan","last_name":"asd","address2":null,"company":null,"latitude":null,"longitude":null,"name":"asd asd","country_code":"PK","province_code":null},"customer":{"id":7583270535486,"email":"asd@asd.com","accepts_marketing":false,"created_at":"2023-12-21T08:53:18-05:00","updated_at":"2023-12-21T09:11:28-05:00","first_name":"asd","last_name":"asd","state":"disabled","note":null,"verified_email":true,"multipass_identifier":null,"tax_exempt":false,"phone":null,"email_marketing_consent":{"state":"not_subscribed","opt_in_level":"single_opt_in","consent_updated_at":null},"sms_marketing_consent":null,"tags":"","currency":"PKR","accepts_marketing_updated_at":"2023-12-21T08:53:18-05:00","marketing_opt_in_level":null,"tax_exemptions":[],"admin_graphql_api_id":"gid://shopify/Customer/7583270535486","default_address":{"id":9694391894334,"customer_id":7583270535486,"first_name":"asd","last_name":"asd","company":null,"address1":"asd","address2":null,"city":"faisalabad","province":null,"country":"Pakistan","zip":"38000","phone":null,"name":"asd asd","province_code":null,"country_code":"PK","country_name":"Pakistan","default":true}},"discount_applications":[],"fulfillments":[],"line_items":[{"id":14356500840766,"admin_graphql_api_id":"gid://shopify/LineItem/14356500840766","fulfillable_quantity":1,"fulfillment_service":"manual","fulfillment_status":null,"gift_card":false,"grams":0,"name":"The Collection Snowboard: Liquid","price":"749.95","price_set":{"shop_money":{"amount":"749.95","currency_code":"PKR"},"presentment_money":{"amount":"749.95","currency_code":"PKR"}},"product_exists":true,"product_id":8128747602238,"properties":[],"quantity":1,"requires_shipping":true,"sku":"","taxable":true,"title":"The Collection Snowboard: Liquid","total_discount":"0.00","total_discount_set":{"shop_money":{"amount":"0.00","currency_code":"PKR"},"presentment_money":{"amount":"0.00","currency_code":"PKR"}},"variant_id":44527051243838,"variant_inventory_management":"shopify","variant_title":null,"vendor":"Hydrogen Vendor","tax_lines":[{"channel_liable":false,"price":"119.99","price_set":{"shop_money":{"amount":"119.99","currency_code":"PKR"},"presentment_money":{"amount":"119.99","currency_code":"PKR"}},"rate":0.16,"title":"GST"}],"duties":[],"discount_allocations":[]}],"payment_terms":null,"refunds":[],"shipping_address":{"first_name":"asd","address1":"asd","phone":null,"city":"faisalabad","zip":"38000","province":null,"country":"Pakistan","last_name":"asd","address2":null,"company":null,"latitude":31.4557119,"longitude":73.08039,"name":"asd asd","country_code":"PK","province_code":null},"shipping_lines":[{"id":4541443440958,"carrier_identifier":"650f1a14fa979ec5c74d063e968411d4","code":"Standard","discounted_price":"0.00","discounted_price_set":{"shop_money":{"amount":"0.00","currency_code":"PKR"},"presentment_money":{"amount":"0.00","currency_code":"PKR"}},"phone":null,"price":"0.00","price_set":{"shop_money":{"amount":"0.00","currency_code":"PKR"},"presentment_money":{"amount":"0.00","currency_code":"PKR"}},"requested_fulfillment_service_id":null,"source":"shopify","title":"Standard","tax_lines":[],"discount_allocations":[]}]}}',
    attributes: [],
    messageAttributes: {},
    md5OfBody: "a4b384e6de3524c73f5696161c5503e3",
    eventSource: "aws:sqs",
    eventSourceARN: "arn:aws:sqs:us-east-2:512076809460:inventory-sync.fifo",
    awsRegion: "us-east-2",
  },
];


// console.log(JSON.parse(payload.body))


const processSQS = async () => {
  try {
    const store = "cocomo001.myshopify.com"
    const sessions = await ShopifySessions.find({})
    // console.log(sessions)


    const storesToBeUpdated = sessions.filter(x => x.shop !== store)

    for(const session of storesToBeUpdated){
      console.log(session)

    }




  } catch (e) {
    console.log(e)
  }
  // const session = res.locals.shopify.session;
  // const client = new shopify.api.clients.Graphql({ session });


}

processSQS()