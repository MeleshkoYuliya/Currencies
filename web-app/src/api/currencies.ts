import axios from "axios";

type GetCurrenciesParams = {
  startDate: string;
  endDate: string;
  symbols: string;
  base?: string;
};

export const getCurrenciesSeries = ({
  startDate,
  endDate,
  symbols,
  base = "USD",
}: GetCurrenciesParams): Promise<any> => {
  return axios.get(`https://api.currencybeacon.com/v1/timeseries`, {
    params: {
      api_key: "O0777iMrNmxxZvHBLABEufaYLfpr4o4K",
      start_date: startDate,
      end_date: endDate,
      base,
      symbols: symbols,
    },
  });
};

export const getCurrencies = (): Promise<any> => {
  return axios.get(`https://api.currencybeacon.com/v1/currencies`, {
    params: {
      api_key: "O0777iMrNmxxZvHBLABEufaYLfpr4o4K",
      type: "fiat",
    },
  });
};

