"use client";

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  options: ApexCharts.ApexOptions;
  series: ApexAxisChartSeries;
}

export function Chart({ options, series }: Props) {

  return (
    <>
      <ApexChart
        type="line"
        options={options}
        series={series}
        height={500}
      />
    </>
  );
}
