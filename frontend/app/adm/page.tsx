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
import { data } from "autoprefixer";

export default function Admin() {
  //ejemplo de los datos
  const [data, setData] = useState([]);
  const statusOptions = [
    { name: "Presentacion", uid: "iniciado" },
    { name: "Aceptacion", uid: "pendiente" },
  ];
  const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "RUT", uid: "rut", sortable: true },
    { name: "Rut de Empresa", uid: "rutEmpresa", sortable: true },
    { name: "Fecha", uid: "fechaSolicitud", sortable: true },
    { name: "N Practica", uid: "numeroPractica", sortable: true },
    { name: "Estado", uid: "fase", sortable: false },
  ];
  const INITIAL_VISIBLE_COLUMNS = ["id", "rut", "Rut de Empresa", "N Practica","Estado"];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await AllSoli();
        const transformedData = rawData.map((item) => ({
          name: item.idSolicitud,
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
  const datos = [
    {
      id: 1,
      name: "Tony Reichert",
      role: "CEO",
      team: "Management",
      status: "active",
      age: "29",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      email: "tony.reichert@example.com",
    },
  ];
  return (
    <div className={styles.AdminDiv}>
      <div className={styles.boxp10}>
        <NextLink href="https://informatica.uv.cl/">
          <Image
            radius="none"
            src="../UV.svg"
            alt="Descripción del SVG"
            width={"100%"}
            height={"100%"}
          />
        </NextLink>
        <div className={styles.boxc11}>Icono Plataforma</div>
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
                datos={datos}
                statusOptions={statusOptions}
                INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
