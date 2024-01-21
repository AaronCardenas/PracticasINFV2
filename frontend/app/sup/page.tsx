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
export default function Sup() {
  //ejemplo de los datos
  const data = [
    {
      id: 1,
      Rut: '11111111-1',
      Nombre: 'Juan',
      Edad: 25,
      FechaI: '2023-01-01',
      FechaT: '2023-01-01',
      Estado: 'Pendiente',
    },
    {
      id: 2,
      Rut: '22222222-2',
      Nombre: 'María',
      Edad: 30,
      FechaI: '2023-01-02',
      FechaT: '2023-01-02',
      Estado: 'Pendiente',
    },
    {
      id: 3,
      Rut: '33333333-3',
      Nombre: 'Josería',
      Edad: 30,
      FechaI: '2023-01-02',
      FechaT: '2023-01-02',
      Estado: 'Pendiente',
    },
    {
      id: 4,
      Rut: '44444444-4',
      Nombre: 'BBría',
      Edad: 30,
      FechaI: '2023-01-02',
      FechaT: '2023-01-02',
      Estado: 'Pendiente',
    },
    {
      id: 5,
      Rut: '55555555-5',
      Nombre: 'AAAría',
      Edad: 30,
      FechaI: '2023-01-02',
      FechaT: '2023-01-02',
      Estado: 'Pendiente',
    },
  ];

  const columns = {
    id: 'Rut',
    Rut: 'Rut',
    Nombre: 'Nombre',
    Edad: 'Edad',
    FechaI: 'Fecha Inicio',
    FechaT: 'Fecha Termino',
    Estado: 'Estado',
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
