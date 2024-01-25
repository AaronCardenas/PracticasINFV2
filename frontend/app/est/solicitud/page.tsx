"use client";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import React, { useState, useEffect } from "react";
import { Button, Select, SelectItem, Input, Image } from "@nextui-org/react";
import NextLink from "next/link";
import styles from "../../../styles/styleop.module.css";
import Datosest from "../../../components/Tablas/datosest";
import { useRouter, useSearchParams } from "next/navigation";
import { funcionSoli, funcionSave, solicitudes} from "../../../api/est/solicitudes"; //cambiar al .env en un futuro

export default function Soli() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const Token = searchParams.get("token");
  const [selectedEmpresaId, setSelectedEmpresaId] = useState(null);
  const [selectedRegionName, setSelectedRegionName] = useState(null);
  const [asignatura, setAsignatura] = useState(null);
  const [isInputsDisabled, setIsInputsDisabled] = useState(false);
  const [sempresa, setSempresa] = useState(false);

  const [razonsocial, setrazonsocial] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [rutEmpresa, setRutEmpresa] = useState("");
  const [rubro, setRubro] = useState("");

  const handleSelectionChangeEmpresa = (e) => {
    const selectedId = e.target.value;
    setSelectedEmpresaId(selectedId);
    setIsInputsDisabled(Boolean(selectedId));
  };
  const handlerazonsocialChange = (e) => {
    setrazonsocial(e.target.value);
  };

  const handleDireccionChange = (e) => {
    setDireccion(e.target.value);
  };

  const handleCiudadChange = (e) => {
    setCiudad(e.target.value);
  };

  const handleRutEmpresaChange = (e) => {
    setRutEmpresa(e.target.value);
  };

  const handleRubroChange = (e) => {
    setRubro(e.target.value);
  };

  const handleAsignaturaChange = (e) => {
    console.log(e.target.value);
    setAsignatura(e.target.value);
  };

  const handleSelectionChangeRegion = (e) => {
    setSelectedRegionName(e.target.value);
  };
  const Solicitar = async () => {
    const datos={
        idSolicitud:12,
        rutEmpresa: selectedEmpresaId,
        numeroPractica: asignatura.id,
        fase: 1
    };
    solicitudes(Token, datos);
  };
  const Save = async () => {
    // Aquí puedes utilizar los valores almacenados en los estados
    const dataToSave = {
      rutEmpresa: rutEmpresa,
      razonsocial: razonsocial,
      ciudad: ciudad,
      region: selectedRegionName,
      direccion: direccion,
      rubro: rubro,
    };
    // Llamar a la función de guardado con los datos
    funcionSave(dataToSave);
    setSempresa(true);
    setIsInputsDisabled(true);
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
      id: 969608006,
      nombre: "GasValpo",
      rurbo: "Awa",
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
  ];

  const region = [
    {
      id: 1,
      nombre: "Región I - Tarapacá",
    },
    {
      id: 2,
      nombre: "Región II - Antofagasta",
    },
    {
      id: 3,
      nombre: "Región III - Atacama",
    },
    {
      id: 4,
      nombre: "Región IV - Coquimbo",
    },
    {
      id: 5,
      nombre: "Región V - Valparaíso",
    },
    {
      id: 6,
      nombre: "Región VI - O'Higgins",
    },
    {
      id: 7,
      nombre: "Región VII - Maule",
    },
    {
      id: 8,
      nombre: "Región VIII - Biobío",
    },
    {
      id: 9,
      nombre: "Región IX - La Araucanía",
    },
    {
      id: 10,
      nombre: "Región X - Los Ríos",
    },
    {
      id: 11,
      nombre: "Región XI - Aysén",
    },
    {
      id: 12,
      nombre: "Región XII - Magallanes",
    },
    {
      id: 13,
      nombre: "Región Metropolitana",
    },
    {
      id: 14,
      nombre: "Región XIV - Los Ríos",
    },
    {
      id: 15,
      nombre: "Región XV - Arica y Parinacota",
    },
    {
      id: 16,
      nombre: "Región XVI - Ñuble",
    },
  ];
  return (
    <div className={styles.EstDiv}>
      <div className={styles.boxe10}>
        <NextLink href="https://informatica.uv.cl/" className={styles.boxe13}>
          <Image
            radius="none"
            src="../UV.svg"
            alt="Descripción del SVG"
            width={"100%"}
            height={"100%"}
          />
        </NextLink>
        <div className={styles.boxe11}>icono pag</div>
        <div className={styles.boxe12}>
          <NextLink
            className={styles.nextEst}
            href={{ pathname: "/solicitud", query: { token: "token" } }}
          >
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
              <div className={styles.boxe22000soli}>
                <p className={styles.TextSoli}>Asignatura</p>
                <Select
                  id="select-Asignatura"
                  aria-label="Asignatura"
                  size="lg"
                  variant="faded"
                  color="secondary"
                  placeholder="Selecciona una asignatura"
                  labelPlacement="outside"
                  className={styles.selectSoli}
                  onChange={handleAsignaturaChange}
                >
                  {Asignaturas.map((asignatura) => (
                    <SelectItem
                      className={styles.selectItemSoli}
                      key={asignatura.id}
                      value={asignatura.id}
                    >
                      {asignatura.nombre}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className={styles.boxe22000soli}>
                <p className={styles.TextSoli}>Empresas</p>
                <Select
                  id="select-Empresa"
                  aria-label="Empresas"
                  size="lg"
                  variant="faded"
                  color="secondary"
                  placeholder="Selecciona una Empresa"
                  labelPlacement="outside"
                  className={styles.selectSoli}
                  isDisabled={sempresa}
                  onChange={handleSelectionChangeEmpresa}
                >
                  {dataempresa.map((empresa) => (
                    <SelectItem
                      className={styles.selectItemSoli}
                      key={empresa.id}
                      value={empresa.id}
                    >
                      {empresa.nombre}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className={styles.boxe2201soli}>
              <div className={styles.boxe22010soli}>
                <div className={styles.boxe220110soli}>
                  <div className={styles.boxe2201100soli}>
                    <Input
                      radius="sm"
                      size="lg"
                      label="Razon social"
                      labelPlacement="outside"
                      classNames={{
                        inputWrapper: ["bg-default-200/50", "!cursor-text"],
                        label: ["!text-white"],
                      }}
                      isDisabled={isInputsDisabled}
                      value={razonsocial}
                      onChange={handlerazonsocialChange}
                    />
                  </div>
                  <div className={styles.boxe2201100soli}>
                    <Input
                      radius="sm"
                      size="lg"
                      label="Direccion"
                      labelPlacement="outside"
                      classNames={{
                        inputWrapper: ["bg-default-200/50", "!cursor-text"],
                        label: ["!text-white"],
                      }}
                      isDisabled={isInputsDisabled}
                      value={direccion}
                      onChange={handleDireccionChange}
                    />
                  </div>
                </div>
                <div className={styles.boxe220110soli}>
                  <div className={styles.boxe2201100soli}>
                    <Select
                      aria-label="Region"
                      size="lg"
                      variant="faded"
                      color="secondary"
                      placeholder="Selecciona una Region"
                      labelPlacement="outside"
                      onChange={handleSelectionChangeRegion}
                      isDisabled={isInputsDisabled}
                    >
                      {region.map((region) => (
                        <SelectItem
                          className={styles.selectItemSoli}
                          key={region.nombre}
                          value={region.nombre}
                        >
                          {region.nombre}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className={styles.boxe2201100soli}>
                    <Input
                      radius="sm"
                      size="lg"
                      label="Ciudad"
                      labelPlacement="outside"
                      classNames={{
                        inputWrapper: ["bg-default-200/50", "!cursor-text"],
                        label: ["!text-white"],
                      }}
                      isDisabled={isInputsDisabled}
                      value={ciudad}
                      onChange={handleCiudadChange}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.boxe22011soli}>
                <div className={styles.boxe220110soli}>
                  <div className={styles.boxe2201100soli}>
                    <Input
                      radius="sm"
                      size="lg"
                      label="Rut"
                      labelPlacement="outside"
                      classNames={{
                        inputWrapper: ["bg-default-200/50", "!cursor-text"],
                        label: ["!text-white"],
                      }}
                      isDisabled={isInputsDisabled}
                      value={rutEmpresa}
                      onChange={handleRutEmpresaChange}
                    />
                  </div>
                  <div className={styles.boxe2201100soli}>
                    <Input
                      radius="sm"
                      size="lg"
                      label="Rubro"
                      labelPlacement="outside"
                      classNames={{
                        inputWrapper: ["bg-default-200/50", "!cursor-text"],
                        label: ["!text-white"],
                      }}
                      isDisabled={isInputsDisabled}
                      value={rubro}
                      onChange={handleRubroChange}
                    />
                  </div>
                </div>
                <div className={styles.boxe220110soli}>
                  <div className={styles.boxe2201100soli}>
                    <Button
                      className={styles.buttomSoli}
                      isDisabled={isInputsDisabled}
                      onClick={Save}
                    >
                      Guardar
                    </Button>
                    <Button className={styles.buttomSoli} onClick={Solicitar}>
                      Solicitar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.boxe221soli}>
            <div className={styles.boxe2210soli}>
              <Datosest token={Token}/>
            </div>
            <NextLink
              className={styles.boxe2211soli}
              href="https://informatica.uv.cl/"
            >
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
