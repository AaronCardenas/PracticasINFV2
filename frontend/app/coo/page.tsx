"use client";
import React, { useState, useEffect } from 'react';
import {
  Button,
  Image,
} from "@nextui-org/react";
import { useRouter } from "next/router"; // Importa el router de Next.js
import styles from "../../styles/styleop.module.css";
import { motion } from "framer-motion";
import Listar from "../../components/Tablas/tabla";
import NextLink from "next/link";
export default function Coor() {
  //ejemplo de los datos
  const data = [
    {
      id: 1222222,
      nombre: 'Juan',
      edad: 25,
      fecha: '2023-01-01',
    },
    {
      id: 2,
      nombre: 'María',
      edad: 30,
      fecha: '2023-01-02',
    },
    {
      id: 3,
      nombre: 'Pedro',
      edad: 28,
      fecha: '2023-01-03',
    },
    {
      id: 4,
      nombre: 'Ana',
      edad: 35,
      fecha: '2023-01-04',
    },
    {
      id: 5,
      nombre: 'Luis',
      edad: 32,
      fecha: '2023-01-05',
    },
    {
      id: 6,
      nombre: 'Carlos',
      edad: 27,
      fecha: '2023-01-06',
    },
    {
      id: 7,
      nombre: 'Laura',
      edad: 29,
      fecha: '2023-01-07',
    },
    {
      id: 8,
      nombre: 'Sofía',
      edad: 31,
      fecha: '2023-01-08',
    },
    {
      id: 9,
      nombre: 'Diego',
      edad: 26,
      fecha: '2023-01-09',
    },
    {
      id: 10,
      nombre: 'Isabella',
      edad: 33,
      fecha: '2023-01-10',
    },
    {
      id: 11,
      nombre: 'Andrea',
      edad: 28,
      fecha: '2023-01-11',
    },
    {
      id: 12,
      nombre: 'Gabriel',
      edad: 30,
      fecha: '2023-01-12',
    },
    {
      id: 13,
      nombre: 'Valentina',
      edad: 34,
      fecha: '2023-01-13',
    },
    {
      id: 14,
      nombre: 'Miguel',
      edad: 25,
      fecha: '2023-01-14',
    },
  ];
  const columns = {
    id: 'Rut',
    nombre: 'Nombre',
    edad: 'Edad',
    fecha: 'Fecha',
  };
  //ejemplo de los datos
  return (
    <div className={styles.CooDiv}>
      <div className={styles.boxc10}>
        <div className={styles.boxc13}><NextLink href="https://informatica.uv.cl/" className={styles.boxe13}><Image radius="none" src='../UV.svg' alt="Descripción del SVG" width={'100%'} height={"100%"} /></NextLink></div>
        <div className={styles.boxc11}>Icono Plataforma</div>
        <div className={styles.boxc12}>
          <Button className={styles.botcoo} variant='light'>Boton</Button>
          <Button className={styles.botcoo} variant='light'>Boton</Button>
          <Button className={styles.botcoo} variant='light'>Boton</Button>
          <Button className={styles.botcoo} variant='light'>Boton</Button>
          <Button className={styles.botcoo} variant='light'>Boton</Button>
          <Button className={styles.botcoo} variant='light'>Boton</Button>
        </div>
      </div>
      <div className={styles.boxc20}>
        <div className={styles.boxc21}> iconos notificaciones, usuario</div>
        <div className={styles.boxc22}>
          <div className={styles.boxc220}>Titulos1</div>
          <div className={styles.boxc221}>
            <div className={styles.boxc2210}>
              <div className={styles.boxc22100}> Graficos </div>
              <div className={styles.boxc22100}> Estadisticas </div>
              <div className={styles.boxc22100}> Estadistica 2 </div>
            </div>
            <div className={styles.boxc2211}>
              <div className={styles.boxc22110}>
                <div className={styles.boxc221100}> Iconos cambio tabla1 </div>
                <div className={styles.boxc221101}> Iconos cambio tabla2 </div>
                <div className={styles.boxc221102}> Iconos cambio tabla3 </div>
              </div>
              <div className={styles.boxc22111}>
                <Listar columns={columns} data={data}/>
              </div>
              <div className={styles.boxc22112}>
                <div className={styles.boxc221120}> Ultimas notifiaciones </div>
                <div className={styles.boxc221121}> Ultimas notifiaciones </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
