"use client";
import React, { useState, useEffect } from "react";
import { Button, Image } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation"; // Importa el router de Next.js
import styles from "../../styles/styleop.module.css";
import { motion } from "framer-motion";
import Listar from "../../components/Tablas/tab";
import NextLink from "next/link";
import { AllSoli } from "../../api/adm/solicitudes";
import TAB from "../../components/Tablas/TabADM/fulltab";

export default function Admin() {
  //ejemplo de los datos
  const [data, setData] = useState([]);
  const statusOptions = [
    { name: "Presentacion", uid: "1" },
    { name: "Aceptacion", uid: "2" },
  ];
  const columns = [
    { name: "ID", uid: "idSolicitud", sortable: true },
    { name: "RUT Estudiante", uid: "rut", sortable: true },
    { name: "RUT Empresa", uid: "rutEmpresa", sortable: true },
    { name: "Fecha", uid: "fechaSolicitud", sortable: true },
    { name: "N Practica", uid: "numeroPractica", sortable: true },
    { name: "Estado", uid: "fase", sortable: false },
    { name: "Actions", uid: "actions", sortable: false },
  ];
  const INITIAL_VISIBLE_COLUMNS = [
    "idSolicitud",
    "rut",
    "rutEmpresa",
    "numeroPractica",
    "fase",
    "actions",
  ];
  const statusColorMap = {
    active: "success",
    paused: "danger",
    vacation: "warning",
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await AllSoli();
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
    <div className={styles.AdminDiv}>
      <div className={styles.boxp10}>
        <NextLink href="https://informatica.uv.cl/" className={styles.boxc11}>
          <Image
            id="logoPracticas"
            radius="none"
            src="../PracticasUV2.svg"
            alt="Icono de la plataforma"
            height={"50%"}
          />
          <Image
            radius="none"
            src="../UV.svg"
            alt="Icono UV"
            height={"50%"}
          />
        </NextLink>
        <div className={styles.boxe12}>
          <Button className={styles.botones}>boton1</Button>
          <Button className={styles.botones}>boton1</Button>
          <Button className={styles.botones}>boton1</Button>
          <Button className={styles.botones}>Logout</Button>
        </div>
      </div>
      <div className={styles.boxp20}>
        <div className={styles.boxp21}>ICONOUSER</div>
        <div className={styles.boxp22}>
          <div className={styles.boxp220}>Titulos1</div>
          <div className={styles.boxp221}>
            <div className={styles.boxp2210}>
              <p>Search</p>
              <p>Boton</p>
            </div>
            <div className={styles.boxp2211}>
              <TAB
                columns={columns}
                datos={data}
                statusOptions={statusOptions}
                INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                statusColorMap={statusColorMap}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
