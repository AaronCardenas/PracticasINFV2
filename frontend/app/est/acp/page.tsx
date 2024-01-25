"use client";
import React, { useState, useEffect } from "react";
import { Button, Select, SelectItem, Input, Image} from "@nextui-org/react";
import NextLink from "next/link";
import { useRouter, useSearchParams } from 'next/navigation';
import styles from "../../../styles/styleop.module.css";
import Datosest from "@/components/Tablas/datosest";
import { datosEMP } from "../../../api/est/solicitudes.jsx";

import Date from "../../../components/datepicker";
import TodoList from "../../../components/tareas";
export default function Acp() {
  const [value, setValue] = React.useState("");

  const [datos, setData] = useState({});

  const searchParams = useSearchParams(); 
  const router= 
  useRouter();
  const Token = searchParams.get('token');
  const idSolicitud = searchParams.get('idSolicitud');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const datos = await datosEMP(idSolicitud);
        setData(datos.empresa);
        console.log(datos.empresa);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };
    fetchData();
  }, [idSolicitud]);

  const handleSelectionChange = (e) => {
    setValue(e.target.value);
  };
  const dataSoli = [
    {
      "N° Solicitud": 1222222,
      Práctica: "Práctica 1",
      Empresa: "Empresa 1",
      Estado: "Aprobado",
      documentos: "Documento 1",
    },
    {
      "N° Solicitud": 2,
      Práctica: "Práctica 2",
      Empresa: "Empresa 2",
      Estado: "Pendiente",
      documentos: "Documento 2",
    },
    {
      "N° Solicitud": 3,
      Práctica: "Práctica 3",
      Empresa: "Empresa 3",
      Estado: "Rechazado",
      documentos: "Documento 3",
    },
    {
      "N° Solicitud": 4,
      Práctica: "Práctica 4",
      Empresa: "Empresa 4",
      Estado: "Aprobado",
      documentos: "Documento 4",
    },
    {
      "N° Solicitud": 5,
      Práctica: "Práctica 5",
      Empresa: "Empresa 5",
      Estado: "Pendiente",
      documentos: "Documento 5",
    },
    {
      "N° Solicitud": 6,
      Práctica: "Práctica 6",
      Empresa: "Empresa 6",
      Estado: "Rechazado",
      documentos: "Documento 6",
    },
    {
      "N° Solicitud": 7,
      Práctica: "Práctica 7",
      Empresa: "Empresa 7",
      Estado: "Aprobado",
      documentos: "Documento 7",
    },
    {
      "N° Solicitud": 8,
      Práctica: "Práctica 8",
      Empresa: "Empresa 8",
      Estado: "Pendiente",
      documentos: "Documento 8",
    },
    {
      "N° Solicitud": 9,
      Práctica: "Práctica 9",
      Empresa: "Empresa 9",
      Estado: "Rechazado",
      documentos: "Documento 9",
    },
    {
      "N° Solicitud": 10,
      Práctica: "Práctica 10",
      Empresa: "Empresa 10",
      Estado: "Aprobado",
      documentos: "Documento 10",
    },
    {
      "N° Solicitud": 11,
      Práctica: "Práctica 11",
      Empresa: "Empresa 11",
      Estado: "Pendiente",
      documentos: "Documento 11",
    },
    {
      "N° Solicitud": 12,
      Práctica: "Práctica 12",
      Empresa: "Empresa 12",
      Estado: "Rechazado",
      documentos: "Documento 12",
    },
    {
      "N° Solicitud": 13,
      Práctica: "Práctica 13",
      Empresa: "Empresa 13",
      Estado: "Aprobado",
      documentos: "Documento 13",
    },
    {
      "N° Solicitud": 14,
      Práctica: "Práctica 14",
      Empresa: "Empresa 14",
      Estado: "Pendiente",
      documentos: "Documento 14",
    },
  ];
  const columnsSoli = {
    "N° Solicitud": "N° Solicitud",
    Práctica: "Práctica",
    Empresa: "Empresa",
    Estado: "Estado",
    documentos: "Documentos",
  };
  const dataempresa = [
    {
      id: 1222222,
      nombre: "JuanMaestro",
      rurbo: "Industria",
    },
    {
      id: 1111111,
      nombre: "Guaton",
      rurbo: "Alimentación",
    },
    {
      id: 1333333,
      nombre: "Mcdonals",
      rurbo: "Alimentación",
    },
    {
      id: 1444444,
      nombre: "KFC",
      rurbo: "Alimentación",
    },
  ];
  const columnsempresa = {
    id: "Rut",
    nombre: "Razon Social",
    rurbo: "Rubro",
  };
  const Asignaturas = [
    {
      id: "1",
      nombre: "ICI-2413",
      carrera: "Ingenieria Civil Informatica",
    },
    {
      id: "2",
      nombre: "ICI-2414",
      carrera: "Ingenieria Civil Informatica",
    },
    {
      id: "3",
      nombre: "ICI-2415",
      carrera: "Ingenieria Civil Informatica",
    },
    {
      id: "4",
      nombre: "ICI-2416",
      carrera: "Ingenieria Civil Informatica",
    },
    {
      id: "5",
      nombre: "ICI-2417",
      carrera: "Ingenieria Civil Informatica",
    },
    {
      id: "6",
      nombre: "ICI-2418",
      carrera: "Ingenieria Civil Informatica",
    },
  ];
  return (
    <div className={styles.EstDiv}>
      <div className={styles.boxe10}>
        <NextLink href="https://informatica.uv.cl/" className={styles.boxe13}><Image radius="none" src='../UV.svg' alt="Descripción del SVG" width={'100%'} height={"100%"} /></NextLink>
        <div className={styles.boxe11}>
          icono pag
        </div>
        <div className={styles.boxe12}>
          <NextLink className={styles.nextEst} href="/solicitud">
            <Button className={styles.botNextEst} variant="light">
              Nueva Solicitud
            </Button>
          </NextLink>
          <NextLink className={styles.nextEst} href="/est">
            <Button className={styles.botNextEst} variant="light">
              Mis Solicitud
            </Button>
          </NextLink>
          <Button className={styles.botEst} variant="light">
            Logout
          </Button>
        </div>
      </div>
      <div className={styles.boxe20}>
        <div className={styles.boxe21}> iconos notificaciones, usuario</div>
        <div className={styles.boxe22Soli}>
          <div className={styles.boxe220soli}>
            <div className={styles.boxe2200soli}>
              <div className={styles.boxe22000acp}>
                  <p>Fecha inicio</p>
                  <Date />
                  <p>Fecha termino</p>
                  <Date />
              </div>
              <div className={styles.boxe22001acp}>
                <p>Tareas de practica</p>
                <TodoList />
              </div>
            </div>
            <div className={styles.boxe2201soli}>
              <div className={styles.boxe22010soli}>
                <div className={styles.boxe220110soli}>
                  <div className={styles.boxe2201100soli}>
                    <Input
                        id= "input-rs"
                        placeholder={datos.razonSocial}
                        radius="sm"
                        size="lg"
                        label="Razon social"
                        labelPlacement="outside"
                        classNames={{
                          inputWrapper: ["bg-default-200/50", "!cursor-text"],
                          label: ["!text-white"],
                        }}
                        isDisabled
                      />
                  </div>
                  <div className={styles.boxe2201100soli}>
                    <Input
                      id= "input-dir"
                      placeholder={datos.direccion}
                      radius="sm"
                      size="lg"
                      label="Direccion"
                      labelPlacement="outside"
                      classNames={{
                        inputWrapper: ["bg-default-200/50", "!cursor-text"],
                        label: ["!text-white"],
                      }}
                      isDisabled
                      
                    />
                  </div>
                </div>
                <div className={styles.boxe220110soli}>
                  <div className={styles.boxe2201100soli}>
                  <Input
                      id= "input-region"
                      placeholder={datos.region}
                      radius="sm"
                      size="lg"
                      label="Region"
                      labelPlacement="outside"
                      classNames={{
                        inputWrapper: ["bg-default-200/50", "!cursor-text"],
                        label: ["!text-white"],
                      }}
                      isDisabled
                    />
                  </div>
                  <div className={styles.boxe2201100soli}>
                  <Input
                      id= "input-ciud"
                      placeholder={datos.ciudad}
                      radius="sm"
                      size="lg"
                      label="Ciudad"
                      labelPlacement="outside"
                      classNames={{
                        inputWrapper: ["bg-default-200/50", "!cursor-text"],
                        label: ["!text-white"],
                      }}
                      isDisabled
                    />
                  </div>
                </div>
              </div>
              <div className={styles.boxe22011soli}>
                <div className={styles.boxe220110soli}>
                  <div className={styles.boxe2201100soli}>
                  <Input
                      id= "input-rut"
                      placeholder={datos.rutEmpresa}
                      radius="sm"
                      size="lg"
                      label="Rut"
                      labelPlacement="outside"
                      classNames={{
                        inputWrapper: ["bg-default-200/50", "!cursor-text"],
                        label: ["!text-white"],
                      }}
                      isDisabled
                    />
                  </div>
                  <div className={styles.boxe2201100soli}>
                  <Input
                      id= "input-rub"
                      placeholder={datos.rubro}
                      radius="sm"
                      size="lg"
                      label="Rubro"
                      labelPlacement="outside"
                      classNames={{
                        inputWrapper: ["bg-default-200/50", "!cursor-text"],
                        label: ["!text-white"],
                      }}
                      isDisabled
                    />
                  </div>
                </div>
                <div className={styles.boxe220110soli}>
                  <div className={styles.boxe2201100soli}>
                    <Button className={styles.buttomSoli}>Guardar</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.boxe221soli}>
            <div className={styles.boxe2210soli}>
             <Datosest token={Token}/>
            </div>
            <NextLink className={styles.boxe2211soli} href="https://informatica.uv.cl/">
                Universidad de Valparaiso
              <Image
                src="https://informatica.uv.cl/templates/yootheme/cache/75/Banner_Web_2023_Informatica_2_1-75ac94f1.webp"
                width="100%"
                height="100%"
                alt="Image"
                sizes="cover"
                isZoomed
              />
            </NextLink>
          </div>
        </div>
      </div>
    </div>
  );
}