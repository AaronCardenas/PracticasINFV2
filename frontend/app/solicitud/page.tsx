'use client';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import React, { useState, useEffect } from 'react';
import { Button, Select, SelectItem, Input, Image } from '@nextui-org/react';
import NextLink from 'next/link';
import styles from '../../styles/styleop.module.css';
import { motion } from 'framer-motion';
import Listar from '../../components/Tablas/tabla';
import Datosest from '../../components/Tablas/datosest';
import { useRouter, useSearchParams } from 'next/navigation';
const backendUrl = 'http://localhost:3000'; //cambiar al .env en un futuro

export default function Soli() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const searchParams = useSearchParams();
  const Token = searchParams.get('token');
  console.log('Token: ', Token);
  const [selectedEmpresaId, setSelectedEmpresaId] = useState(null);
  const [value, setValue] = React.useState('');
  const handleSelectionChange = (e) => {
    setValue(e.target.value);
  };
  const handleSelectionChangeEmpresa = (e) => {
    setValue(e.target.value);
    setSelectedEmpresaId(e.target.value);
  };
  const dataSoli = [
    {
      'N° Solicitud': 1222222,
      Práctica: 'Práctica 1',
      Empresa: 'Empresa 1',
      Estado: 'Aprobado',
      documentos: 'Documento 1',
    },
    {
      'N° Solicitud': 2,
      Práctica: 'Práctica 2',
      Empresa: 'Empresa 2',
      Estado: 'Pendiente',
      documentos: 'Documento 2',
    },
    {
      'N° Solicitud': 3,
      Práctica: 'Práctica 3',
      Empresa: 'Empresa 3',
      Estado: 'Rechazado',
      documentos: 'Documento 3',
    },
    {
      'N° Solicitud': 4,
      Práctica: 'Práctica 4',
      Empresa: 'Empresa 4',
      Estado: 'Aprobado',
      documentos: 'Documento 4',
    },
    {
      'N° Solicitud': 5,
      Práctica: 'Práctica 5',
      Empresa: 'Empresa 5',
      Estado: 'Pendiente',
      documentos: 'Documento 5',
    },
    {
      'N° Solicitud': 6,
      Práctica: 'Práctica 6',
      Empresa: 'Empresa 6',
      Estado: 'Rechazado',
      documentos: 'Documento 6',
    },
    {
      'N° Solicitud': 7,
      Práctica: 'Práctica 7',
      Empresa: 'Empresa 7',
      Estado: 'Aprobado',
      documentos: 'Documento 7',
    },
    {
      'N° Solicitud': 8,
      Práctica: 'Práctica 8',
      Empresa: 'Empresa 8',
      Estado: 'Pendiente',
      documentos: 'Documento 8',
    },
    {
      'N° Solicitud': 9,
      Práctica: 'Práctica 9',
      Empresa: 'Empresa 9',
      Estado: 'Rechazado',
      documentos: 'Documento 9',
    },
    {
      'N° Solicitud': 10,
      Práctica: 'Práctica 10',
      Empresa: 'Empresa 10',
      Estado: 'Aprobado',
      documentos: 'Documento 10',
    },
    {
      'N° Solicitud': 11,
      Práctica: 'Práctica 11',
      Empresa: 'Empresa 11',
      Estado: 'Pendiente',
      documentos: 'Documento 11',
    },
    {
      'N° Solicitud': 12,
      Práctica: 'Práctica 12',
      Empresa: 'Empresa 12',
      Estado: 'Rechazado',
      documentos: 'Documento 12',
    },
    {
      'N° Solicitud': 13,
      Práctica: 'Práctica 13',
      Empresa: 'Empresa 13',
      Estado: 'Aprobado',
      documentos: 'Documento 13',
    },
    {
      'N° Solicitud': 14,
      Práctica: 'Práctica 14',
      Empresa: 'Empresa 14',
      Estado: 'Pendiente',
      documentos: 'Documento 14',
    },
  ];
  const columnsSoli = {
    'N° Solicitud': 'N° Solicitud',
    Práctica: 'Práctica',
    Empresa: 'Empresa',
    Estado: 'Estado',
    documentos: 'Documentos',
  };
  const dataempresa = [
    {
      id: 969608006,
      nombre: 'GasValpo',
      rurbo: 'Awa',
    },
    {
      id: 1111111,
      nombre: 'Guaton',
      rurbo: 'Alimentación',
    },
    {
      id: 1333333,
      nombre: 'Mcdonals',
      rurbo: 'Alimentación',
    },
    {
      id: 1444444,
      nombre: 'KFC',
      rurbo: 'Alimentación',
    },
  ];
  const columnsempresa = {
    id: 'Rut',
    nombre: 'Razon Social',
    rurbo: 'Rubro',
  };
  const Asignaturas = [
    {
      id: '1',
      nombre: 'ICI-2413',
      carrera: 'Ingenieria Civil Informatica',
    },
    {
      id: '2',
      nombre: 'ICI-2414',
      carrera: 'Ingenieria Civil Informatica',
    },
    {
      id: '3',
      nombre: 'ICI-2415',
      carrera: 'Ingenieria Civil Informatica',
    },
    {
      id: '4',
      nombre: 'ICI-2416',
      carrera: 'Ingenieria Civil Informatica',
    },
    {
      id: '5',
      nombre: 'ICI-2417',
      carrera: 'Ingenieria Civil Informatica',
    },
    {
      id: '6',
      nombre: 'ICI-2418',
      carrera: 'Ingenieria Civil Informatica',
    },
  ];

  const funcionSoli = async () => {
    // Configurar los datos para la solicitud a la API
    if (!selectedEmpresaId) {
      alert('Selecciona una empresa antes de solicitar');
      return;
    }

    const Data = {
      rutEmpresa: selectedEmpresaId,
      token: Token,
    };

    // Realiza la solicitud a la API
    try {
      console.log('Data', Data);
      const response = await fetch(`${backendUrl}/utils/unirDatos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Data),
      });

      if (response.ok) {
        const blob = await response.blob();

        // Crear una URL para el blob
        const blobUrl = URL.createObjectURL(blob);
  
        // Abrir una nueva ventana y realizar la descarga
        window.open(blobUrl, '_blank');
        // console.log('response', response);
      } else {
        // Maneja el caso de credenciales incorrectas
        alert('Error al recibir respuesta.');
      }
    } catch (error) {
      // Maneja errores de red o de servidor
      console.error('No funciono fetch:', error);
      alert('Error.');
    }
  };

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
        <div className={styles.boxe11}>icono pag</div>
        <div className={styles.boxe12}>
          <NextLink
            className={styles.nextEst}
            href={{ pathname: '/solicitud', query: { token: 'token' } }}
          >
            <Button className={styles.botNextEst} variant='light'>
              Nueva Solicitud
            </Button>
          </NextLink>
          <NextLink className={styles.nextEst} href='/est'>
            <Button className={styles.botNextEst} variant='light'>
              Mis Solicitud
            </Button>
          </NextLink>
          <Button className={styles.botEst} variant='light'>
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
                <p className={styles.TextSoli}>Asigantura</p>
                <Select
                  aria-label='Asignatura'
                  size='lg'
                  variant='faded'
                  color='secondary'
                  placeholder='Selecciona una asignatura'
                  labelPlacement='outside'
                  className={styles.selectSoli}
                  onChange={handleSelectionChange}
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
                  aria-label='Empresas'
                  size='lg'
                  variant='faded'
                  color='secondary'
                  placeholder='Selecciona una Empresa'
                  labelPlacement='outside'
                  className={styles.selectSoli}
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
                      radius='sm'
                      size='lg'
                      label='Razon social'
                      labelPlacement='outside'
                      classNames={{
                        inputWrapper: ['bg-default-200/50', '!cursor-text'],
                        label: ['!text-white'],
                      }}
                    />
                  </div>
                  <div className={styles.boxe2201100soli}>
                    <Input
                      radius='sm'
                      size='lg'
                      label='Direccion'
                      labelPlacement='outside'
                      classNames={{
                        inputWrapper: ['bg-default-200/50', '!cursor-text'],
                        label: ['!text-white'],
                      }}
                    />
                  </div>
                </div>
                <div className={styles.boxe220110soli}>
                  <div className={styles.boxe2201100soli}>
                    <Input
                      radius='sm'
                      size='lg'
                      label='Direccion 2'
                      labelPlacement='outside'
                      classNames={{
                        inputWrapper: ['bg-default-200/50', '!cursor-text'],
                        label: ['!text-white'],
                      }}
                    />
                  </div>
                  <div className={styles.boxe2201100soli}>
                    <Input
                      radius='sm'
                      size='lg'
                      label='Ciudad'
                      labelPlacement='outside'
                      classNames={{
                        inputWrapper: ['bg-default-200/50', '!cursor-text'],
                        label: ['!text-white'],
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.boxe22011soli}>
                <div className={styles.boxe220110soli}>
                  <div className={styles.boxe2201100soli}>
                    <Input
                      radius='sm'
                      size='lg'
                      label='Rut'
                      labelPlacement='outside'
                      classNames={{
                        inputWrapper: ['bg-default-200/50', '!cursor-text'],
                        label: ['!text-white'],
                      }}
                    />
                  </div>
                  <div className={styles.boxe2201100soli}>
                    <Input
                      radius='sm'
                      size='lg'
                      label='Rubro'
                      labelPlacement='outside'
                      classNames={{
                        inputWrapper: ['bg-default-200/50', '!cursor-text'],
                        label: ['!text-white'],
                      }}
                    />
                  </div>
                </div>
                <div className={styles.boxe220110soli}>
                  <div className={styles.boxe2201100soli}>
                    <Button className={styles.buttomSoli}>Guardar</Button>
                    <Button className={styles.buttomSoli} onClick={funcionSoli}>
                      Solicitar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.boxe221soli}>
            <div className={styles.boxe2210soli}>
              <Datosest />
            </div>
            <NextLink
              className={styles.boxe2211soli}
              href='https://informatica.uv.cl/'
            >
              Universidad de Valparaiso
              <Image
                src='https://informatica.uv.cl/templates/yootheme/cache/75/Banner_Web_2023_Informatica_2_1-75ac94f1.webp'
                width='100%'
                height='100%'
                alt='Image'
                sizes='cover'
                isZoomed
              />
            </NextLink>
          </div>
        </div>
      </div>
    </div>
  );
}
