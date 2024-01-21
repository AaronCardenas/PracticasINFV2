"use client";
import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
} from "@nextui-org/react";
import { useRouter } from "next/router"; // Importa el router de Next.js
import styles from "../../styles/styleop.module.css";
import { motion } from "framer-motion";
import Listar from "../../components/Tablas/tab";
import NextLink from "next/link";
export default function Admin() {
  //ejemplo de los datos
  const data = [
    {
      id: 1,
      nombre: 'Juan',
      edad: 25,
      fecha: '2023-01-01',
      estado: 'Pendiente',
    },
    {
      id: 2,
      nombre: 'María',
      edad: 30,
      fecha: '2023-01-02',
      estado: 'Pendiente',
    },
    {
      id: 3,
      nombre: 'Josería',
      edad: 30,
      fecha: '2023-01-02',
      estado: 'Pendiente',
    },
    {
      id: 4,
      nombre: 'BBría',
      edad: 30,
      fecha: '2023-01-02',
      estado: 'Pendiente',
    },
    {
      id: 5,
      nombre: 'AAAría',
      edad: 30,
      fecha: '2023-01-02',
      estado: 'Pendiente',
    },
  ];

  const columns = {
    id: 'Rut',
    nombre: 'Nombre',
    edad: 'Edad',
    fecha: 'Fecha',
    estado: 'Estado',
  };
  
  const initialModifications = data.reduce((acc, item) => {
    acc[item.id] = 'Pendiente';
    return acc;
  }, {});
  const [modifications, setModifications] = useState(initialModifications);

  const Aprobar = (id) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return { ...item, estado: 'Aprobado' };
      }
      return item;
    });
    setModifications((prevModifications) => ({
      ...prevModifications,
      [id]: 'Aprobado',
    }));
  };

  const Rechazar = (id) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return { ...item, estado: 'Rechazado' };
      }
      return item;
    });
    setModifications((prevModifications) => ({
      ...prevModifications,
      [id]: 'Rechazado',
    }));
  };

  const Pendiente = (id) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return { ...item, estado: 'Pendiente' };
      }
      return item;
    });
    setModifications((prevModifications) => ({
      ...prevModifications,
      [id]: 'Pendiente',
    }));
  };
  const Guardar = () => {
    const pendientes = Object.entries(modifications)
      .filter(([id, estado]) => estado != 'Pendiente')
      .map(([id]) => id);
    const datamod = data.filter((item) => pendientes.includes(String(item.id)));
    console.log("datos a modificar:", datamod);
  };
  return (
    <div className={styles.AdminDiv}>
      <div className={styles.boxp10}>
        <NextLink href="https://informatica.uv.cl/"><Image radius="none" src='../UV.svg' alt="Descripción del SVG" width={'100%'} height={"100%"} /></NextLink>
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
              <Listar columns={columns} data={data} Modificaciones={modifications} Aprobar={Aprobar} Rechazar={Rechazar} Pendiente={Pendiente} Guardar={Guardar}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
