import React, { useEffect, useRef } from 'react';
import * as echarts from "echarts";

const ChileMapChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchChileGeoData = async () => {
      try {
        const token = 'pk.eyJ1IjoibG93ZnJhbWVzIiwiYSI6ImNsdTl3dTA3azBlOTUybW41aG9zaTZia3cifQ.S_lQ-1KqtSTj-pXjupznrg';
        const country = 'Chile';
        const response = await fetch(`https://api.mapbox.com/datasets/v1/mapbox/${country}?access_token=${token}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error al obtener datos geoespaciales de Chile:', error);
        throw error;
      }
    };

    const initializeChart = async () => {
      try {
        const chart = echarts.init(chartRef.current);

        chart.showLoading(); // Mostrar el indicador de carga

        // Obtener los datos geoespaciales de Chile
        const chileGeoData = await fetchChileGeoData();

        // Registrar el mapa de Chile en ECharts
        echarts.registerMap('Chile', chileGeoData);

        const options = {
          title: {
            text: 'Mapa de Chile',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2
          },
          series: [
            {
              type: 'map',
              map: 'Chile',
              roam: true,
              emphasis: {
                label: {
                  show: true
                }
              },
              data: [
                // Puedes proporcionar datos aquí si es necesario
              ]
            }
          ]
        };

        chart.setOption(options);
        chart.hideLoading(); // Ocultar el indicador de carga una vez que los datos se han cargado
      } catch (error) {
        console.error('Error al inicializar el gráfico de mapa de Chile:', error);
      }
    };

    initializeChart();

    return () => {
      // Limpiar el gráfico al desmontar el componente
      const chart = echarts.getInstanceByDom(chartRef.current);
      if (chart) {
        chart.dispose();
      }
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '600px' }} />;
};

export default ChileMapChart;
