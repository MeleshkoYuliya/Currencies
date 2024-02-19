"use client";

import DatePickerComponent from "@/components/DatePicker";
import { Select, message } from "antd";
import moment, { Moment } from "moment";
import { useEffect, useState, useCallback, ErrorInfo } from "react";

import styles from "./page.module.css";
import { Chart } from "@/components/Chart";
import { getCurrenciesSeries, getCurrencies } from "@/api/currencies";

type Currency = {
  name?: string;
  short_code?: string;
};

type Option = {
  value?: string;
  label?: string;
};

export default function Currencies() {
  const [messageApi, contextHolder] = message.useMessage();
  const [startDate, setStartDate] = useState<Moment | Moment[] | null>(null);
  const [endDate, setEndDate] = useState<Moment | Moment[] | null>(null);
  const [currencies, setCurrencies] = useState<Option[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [chartData, setChartData] = useState<{ x: string; y: number }[]>([]);

  const currencyInfo = currencies?.find(
    (item: Option) => item?.value === selectedCurrency
  );

  const handleGetCurrencies = useCallback(async () => {
    try {
      const { data } = await getCurrencies();
      const values = Object.values(data as Currency[])?.map(
        (item: Currency) => ({ value: item?.short_code, label: item?.name })
      );
      setCurrencies(values);
    } catch (error: any) {
      messageApi.open({
        type: "error",
        content:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      });
    }
  }, [messageApi]);

  const handleGetData = useCallback(async () => {
    try {
      const { data } = await getCurrenciesSeries({
        startDate: moment(startDate as Moment).format("YYYY-MM-DD"),
        endDate: moment(endDate as Moment).format("YYYY-MM-DD"),
        symbols: selectedCurrency,
      });
      const newData = Object.entries(data?.response).map(
        ([key, value]: [string, any]) => ({
          x: key,
          y: value[selectedCurrency],
        })
      );
      setChartData(newData);
    } catch (error: any) {
      messageApi.open({
        type: "error",
        content:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      });
    }
  }, [startDate, endDate, selectedCurrency, messageApi]);

  useEffect(() => {
    handleGetCurrencies();
  }, [handleGetCurrencies]);

  useEffect(() => {
    if (startDate && endDate && selectedCurrency) {
      handleGetData();
    }
  }, [selectedCurrency, startDate, endDate, handleGetData]);

  const options = {
    chart: {
      id: selectedCurrency,
      width: "100%",
    },
    yaxis: {
      labels: {
        show: Boolean(chartData?.length),
        formatter: (value: number) => {
          return value.toFixed(2);
        },
      },
    },
  };

  const series = [
    {
      name: selectedCurrency,
      data: chartData,
    },
  ];

  return (
    <div>
      {contextHolder}
      <div className={styles.filters}>
        <DatePickerComponent
          placeholder="Start date"
          value={startDate}
          onCalendarChange={(value) => {
            setStartDate(value);
          }}
          maxDate={moment()}
        />
        <DatePickerComponent
          placeholder="End date"
          maxDate={moment()}
          value={endDate}
          onCalendarChange={(value) => {
            setEndDate(value);
          }}
        />
        <Select
          options={currencies}
          onChange={(value) => setSelectedCurrency(value)}
          className={styles.select}
          placeholder="Select currencies"
        />
      </div>
      {currencyInfo?.label && (
        <div className={styles.chartTitle}>
          Fluctuation of the {currencyInfo?.label} aginst USD
        </div>
      )}
      <Chart options={options} series={series} />
    </div>
  );
}
