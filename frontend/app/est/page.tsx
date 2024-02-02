'use client';
import React, { useState, useEffect } from 'react';
import { Button, Image } from '@nextui-org/react';
import NextLink from 'next/link';
// import { useRouter } from 'next/router'; // Importa el router de Next.js
import styles from '../../styles/styleop.module.css';
import Datosest from '../../components/Tablas/datosest';
import { useRouter } from 'next/navigation';
import TAB from '../../components/Tablas/TabEST/fulltab';
import { AllestSoli,All_EMP } from '../../api/est/solicitudes';
import TAB_EMP from '../../components/Tablas/TabEMP/fulltab';
export default function Est() {
  const router= useRouter();
  const Token =typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [data, setData] = useState([]);
  const [data_emp, setData_emp] = useState([]);
  const statusOptions = [
    { name: "Presentacion", uid: "1" },
    { name: "Aceptacion", uid: "2" },
  ];
  const columns = [
    { name: "ID", uid: "idSolicitud", sortable: true },
    { name: "RUT Empresa", uid: "rutEmpresa", sortable: true },
    { name: "Fecha", uid: "fechaSolicitud", sortable: true },
    { name: "N Practica", uid: "numeroPractica", sortable: true },
    { name: "Estado", uid: "fase", sortable: false },
    { name: "Acciones", uid: "acciones", sortable: false },
  ];
  const INITIAL_VISIBLE_COLUMNS = [
    "idSolicitud",
    "rutEmpresa",
    "numeroPractica",
    "fase",
    "acciones",
    "fechaSolicitud"
  ];
  const INITIAL_VISIBLE_COLUMNS_EMP = [
    "razonSocial",
    "rutEmpresa",
    "region",
  ];
  const columns_emp = [
    { name: "Razon Social", uid: "razonSocial", sortable: true },
    { name: "Rut Empresa", uid: "rutEmpresa", sortable: true },
    { name: "Region", uid: "region", sortable: false },
  ];
  const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await AllestSoli(Token);
        const transformedData = rawData.map((item) => ({
          idSolicitud: item.idSolicitud,
          rut: item.rut,
          rutEmpresa: item.rutEmpresa,
          fechaSolicitud: item.fechaSolicitud,
          numeroPractica: item.numeroPractica,
          fase: item.fase,
        }));
        setData(transformedData);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };
    const fetchDataEMP = async () => {
      try {
        const rawData = await All_EMP(Token);
        const transformedData = rawData.map((item) => ({
          idSolicitud: item.idSolicitud,
          rut: item.rut,
          rutEmpresa: item.rutEmpresa,
          fechaSolicitud: item.fechaSolicitud,
          numeroPractica: item.numeroPractica,
          fase: item.fase,
        }));
        setData(transformedData);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);


  return (
    <div className={styles.EstDiv}>
      <div className={styles.boxe10}>
        <NextLink href='https://informatica.uv.cl/' className={styles.boxe13}>
          <Image
            radius='none'
            src='../UV.svg'
            alt='Descripción del SVG'
            width={'100%'}
            height={'100%'}
          />
        </NextLink>
        <NextLink href='https://informatica.uv.cl/' className={styles.boxe11}>
          <Image
            radius='none'
            src='../UV.svg'
            alt='Descripción del SVG'
            width={'100%'}
            height={'100%'}
          />
        </NextLink>
        <div className={styles.boxe12}>
 
          <Button className={styles.botEst} variant='light'>
            Logout
          </Button>
        </div>
      </div>
      <div className={styles.boxe20}>
        <div className={styles.boxe21}> iconos notificaciones, usuario</div>
        <div className={styles.boxe22}>
          <div className={styles.boxe220}>Panel principal Estudiante</div>
          <div className={styles.boxe221}>
            <div className={styles.boxe2211}>
              <div className={styles.boxe22111}>
                <div className={styles.boxe221111}>
                <TAB
                columns={columns}
                datos={data}
                statusOptions={statusOptions}
                INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                statusColorMap={statusColorMap}
              />
                </div>
              </div>
              <div className={styles.boxe22112}>
                
                <div className={styles.boxe221121}> Memorias </div>
              </div>
            </div>
            <div className={styles.boxe2210}>
              <div className={styles.boxe22100}>
                <Datosest token={Token}/> 
              </div>
              <div className={styles.boxe22101}>
              <TAB_EMP
                columns={columns_emp}
                datos={data}
                statusOptions={statusOptions}
                INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS_EMP}
                statusColorMap={statusColorMap}
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
