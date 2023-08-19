export interface ProductData {
  name: string;
  type: string;
  attributes: ProductDataAttribute[];
  sku: string;
  productName: string;
  shortDescription: string;
  longDescription: string;
  productTypes: string[];
  availability: boolean;
  retailSet: boolean;
  inStock: boolean;
  availableStock: number;
  productMaster: boolean;
  mastered: boolean;
  roundedAverageRating: string;
  readyForShipmentMin: number;
  readyForShipmentMax: number;
  minOrderQuantity: number;
  productBundle: boolean;
  manufacturer: string;
  listPrice: Price;
  salePrice: Price;
  maxOrderQuantity: number;
  stepOrderQuantity: number;
  packingUnit: string;
  images: Image[];
  defaultCategory: DefaultCategory;
  attributeGroups: AttributeGroups;
  promotions: Promotion[];
  seoAttributes: SEOAttributes;
  numberOfReviews: number;
}

export interface AttributeGroups {
  PRODUCT_LABEL_ATTRIBUTES: ProductLabelAttributes;
  PRODUCT_DETAIL_ATTRIBUTES: ProductDetailAttributes;
}

export interface ProductDetailAttributes {
  attributes: PRODUCTDETAILATTRIBUTESAttribute[];
}

export interface PRODUCTDETAILATTRIBUTESAttribute {
  name: string;
  type: Type;
  value: string;
}

export enum Type {
  Boolean = "Boolean",
  Date = "Date",
  Integer = "Integer",
  MultipleString = "MultipleString",
  String = "String",
}

export interface ProductLabelAttributes {
  attributes: PRODUCTLABELATTRIBUTESAttribute[];
}

export interface PRODUCTLABELATTRIBUTESAttribute {
  name: string;
  type: Type;
  value: string[] | number | string;
}

export interface ProductDataAttribute {
  name: string;
  type: Type;
  value: string[] | boolean | number | string;
}

export interface DefaultCategory {
  name: string;
  type: string;
  id: string;
  categoryPath?: DefaultCategory[];
  uri: string;
}

export interface Image {
  name: string;
  type: string;
  effectiveUrl: string;
  viewID: string;
  typeID: string;
  imageActualHeight: number;
  imageActualWidth: number;
  primaryImage: boolean;
}

export interface Price {
  type: string;
  value: number;
  currencyMnemonic: string;
  currency: string;
}

export interface Promotion {
  type: string;
  uri: string;
  title: string;
  itemId: string;
}

export interface SEOAttributes {
  metaTitle: string;
  metaDescription: string;
  robots: string[];
  metaDescriptionGenerate: string;
  metaTitleGenerate: string;
}
