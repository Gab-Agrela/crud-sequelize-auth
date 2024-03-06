export type TProductTypeOne = {
  name: string;
  brand: string;
  model: string;
  price: number;
  color: string;
};

export type TProductTypeTwo = {
  name: string;
  price: number;
  details: {
    brand: string;
    model: string;
    color: string;
  };
};

export type TProductTypeThree = {
  name: string;
  brand: string;
  model: string;
  data: Array<{ price: number; color: string }>;
};

export type TProduct = {
  name: string;
  brand: string;
  model: string;
  options: Array<{ price: number; color: string }>;
};

const typeOfContent = (
  content: TProductTypeOne | TProductTypeTwo | Array<TProductTypeThree>
) => {
  if (Array.isArray(content)) return 3;
  if ("details" in content) return 2;
  return 1;
};

const formatTypeOne = (entry: TProductTypeOne): TProduct => {
  const { name, brand, model, price, color } = entry;
  return {
    name,
    brand,
    model,
    options: [{ price, color }],
  };
};

const formatTypeTwo = (entry: TProductTypeTwo): TProduct => {
  const {
    name,
    price,
    details: { brand, model, color },
  } = entry;
  return {
    name,
    brand,
    model,
    options: [
      {
        price,
        color,
      },
    ],
  };
};

const formatTypeThree = (entry: Array<TProductTypeThree>): Array<TProduct> => {
  return entry.map((product) => {
    const { name, brand, model, data } = product;
    return {
      name,
      brand,
      model,
      options: [...data],
    };
  });
};

export { typeOfContent, formatTypeOne, formatTypeTwo, formatTypeThree };
