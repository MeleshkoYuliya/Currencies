"use client";

import ApexChart from "react-apexcharts";

type Props = {
  options: ApexCharts.ApexOptions;
  series: ApexAxisChartSeries;
};

export function Chart({ options, series = [] }: Props) {

  return (
    <>
      {Boolean(series?.length) && (
        <ApexChart type="line" options={options} series={series} height={500} />
      )}
    </>
  );
}
