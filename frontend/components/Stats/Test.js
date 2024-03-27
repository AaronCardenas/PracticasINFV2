import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const Test = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Inicializar el gráfico una vez que el componente se monta
    const chart = echarts.init(chartRef.current);

    // Configurar opciones del gráfico (por ejemplo)
    const options = {
      // Define tus opciones de gráfico aquí
      title: {
        text: "Mi Gráfico",
        textStyle: {
          color: "blue",
          fontSize: 20,
        },
      },
      // Ejemplo de datos
      dataset: {
        source: [
          ["Producto", "Ventas"],
          ["A", 100],
          ["B", 200],
          ["C", 300],
          // Puedes añadir más datos aquí
        ],
      },
      xAxis: {
        type: "category",
        axisLine: {
          lineStyle: {
            color: "green",
          },
        },
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: "red",
          },
        },
      },
      series: [
        {
          type: "bar",
          itemStyle: {
            color: "orange",
          },
        },
      ],
    };

    // Establecer las opciones en el gráfico
    chart.setOption(options);

    // Asegúrate de limpiar cuando el componente se desmonta
    return () => {
      chart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "100%" }} />;
};

export default Test;
