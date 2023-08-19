import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { writeFile } from 'fs/promises'
import { getProductData } from './getProductData'
import { sendMessage } from './discord'

const PRODUCT_URL =
  'https://sharkninja-prd-cus-001.azure-api.net/icm/b2c/SharkNinja-US-Site/ninjaus;loc=en_US;cur=USD/products;spgid=X2pCSH4l4idSRphVVO8b7rvs0000/NC201'

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const productDataResponse = await getProductData(PRODUCT_URL)

  if (productDataResponse.status !== 'success') {
    const message = `Error fetching product data: ${productDataResponse.error}`
    await sendMessage({ content: message })
    return {
      statusCode: 500,
      body: JSON.stringify({
        message,
      }),
    }
  }

  try {
    const { data: { inStock, availableStock } } = productDataResponse;

    if (!inStock) {
      const message = `Product is out of stock.`
      return {
        statusCode: 200,
        body: JSON.stringify({
          message,
        }),
      }
    }

    const message = `Product is in stock. available stock: ${availableStock}`
    await sendMessage({ content: message })
    return {
      statusCode: 200,
      body: JSON.stringify({
        message,
      }),
    };
  } catch (error) {
    const message = `Error parsing product data: ${error.message}`
    await sendMessage({ content: message })
    return {
      statusCode: 500,
      body: JSON.stringify({
        message,
      }),
    }
  }

}
