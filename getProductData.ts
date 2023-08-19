import { ProductData } from './Product';

enum ProductDataResponseStatus {
  SUCCESS = "success",
  FETCH_ERROR = "fetch_error",
  PARSE_ERROR = "parse_error",
  OTHER_ERROR = "other_error",
}


type ProductDataResponse = {
  data?: ProductData;
  error?: string;
  status: ProductDataResponseStatus;
}

export async function getProductData(url: string): Promise<ProductDataResponse> {
  //console.log("Fetching data from url", url);
  const response = await fetchResponseFromURL(url);
  if (response.status !== ProductDataResponseStatus.SUCCESS) {
    return {
      status: response.status,
      error: response.error,
    };
  }

  //console.log("response", JSON.stringify(response.data));

  const parsedResponse = await parseProductData<ProductData>(response.data);
  if (parsedResponse.status !== ProductDataResponseStatus.SUCCESS) {
    return {
      status: parsedResponse.status,
      error: parsedResponse.error,
    };
  }

  //console.log("parsedResponse", parsedResponse);

  const productData = parsedResponse.data;

  return {
    status: ProductDataResponseStatus.SUCCESS,
    data: productData,
  }
}

const fetchResponseFromURL = async (url: string) => {
  try {
    const response = await fetch(url);
    //console.log("response is ", response)
    return {
      status: ProductDataResponseStatus.SUCCESS,
      data: response,
    }
  } catch (error) {
    return {
      status: ProductDataResponseStatus.FETCH_ERROR,
      error: error.message,
    }
  }
}

async function parseProductData<T>(responseData: Response) {
  try {
    const jsonData = await responseData.json();
    return {
      status: ProductDataResponseStatus.SUCCESS,
      data: jsonData as T,
    }
  } catch (error) {
    return {
      status: ProductDataResponseStatus.PARSE_ERROR,
      error: error.message,
    }
  }
}