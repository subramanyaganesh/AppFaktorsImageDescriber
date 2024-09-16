import axios from "axios";
import ollama from "ollama";

export async function askOllama(prompt, model = "llama3.1") {
  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model,
      prompt,
      stream: false,
    });
    return response.data.response;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

export async function askOllama2(query,imagePath) {
  let messages = [{
    'role': 'user',
    'content': query,
    //'images': [imagePath]
}]

 
  console.log("Thhis is my Messages:", messages);
  try {
    const response = await ollama.chat({
      model: "llama3", //change as and when needed
      messages: messages,
    });
    return response.message.content;
  } catch (error) {
    console.error("Error calling Ollama API:", error);
    throw error;
  }
}
let query = `Online_Boutique_System:
TrustZones:
  Internet_TrustZone:
    - Customer

  Corp_TrustZone:
    Frontend:
      connections:
        - to: Cart_Service
          description: "Get cart, add item to cart"
        - to: Cart_Cache
          description: "Get cart"
        - to: Email_Service
          description: "Send order confirmation"
        - to: Checkout_Service
          description: "Place order"
        - to: Ad_Service
          description: "Get ads"
        - to: Currency_Service
          description: "Convert currency"
        - to: Product_Catalog_Service
          description: "Get product catalog"
        - to: Shipping_Service
          description: "Get shipping quote"
        - to: Recommendation_Service
          description: "Get product recommendation"

    Cart_Service:
      connections:
        - to: Cart_Cache
          description: "Get cart, update cart"

    Cart_Cache:
      type: cache

    Email_Service:
      connections:
        - to: Checkout_Service
          description: "Listen to order placed"

    Checkout_Service:
      connections:
        - to: Payment_Service
          description: "Process payment"
        - to: Email_Service
          description: "Send order confirmation"
        - to: Cart_Service
          description: "Clear cart"
        - to: Shipping_Service
          description: "Ship order"

    Ad_Service: {}

    Currency_Service:
      connections:
        - to: Bank.Currency_Exchange_API
          description: "Convert currency"

    Payment_Service:
      connections:
        - to: Partner_TrustZone.Stripe_Payment_Provider
          description: "Process payment"

    Product_Catalog_Service: {}

    Shipping_Service: {}

    Recommendation_Service: {}

  Partner_TrustZone:
    Stripe_Payment_Provider: {}

External_Services:
  Bank:
    Currency_Exchange_API: {}

connections:
- from: Internet_TrustZone.Customer
  to: Corp_TrustZone.Frontend
  description: "User interaction"
- from: Corp_TrustZone
  to: Partner_TrustZone.Stripe_Payment_Provider
  description: "Payment processing"
- from: Corp_TrustZone.Currency_Service
  to: Bank.Currency_Exchange_API
  description: "Currency conversion"`

// query+='\nFor the above application architecture could you create threat model'
// console.log("Starting the process");
// askOllama2(query);
