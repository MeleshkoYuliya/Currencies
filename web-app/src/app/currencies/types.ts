export type Currency = {
  name?: string;
  short_code?: string;
};

export type Option = {
  value?: string;
  label?: string;
};

export type CurrencyItem = {
  [key: string]: number;
};

export type ApiResponse = { [key: string]: CurrencyItem };

export type Error = {
  response: {
    data: {
      message: string;
    }
  }
};
