'use client';
import React, { useState, useEffect } from 'react';
import { Button, Image } from '@nextui-org/react';
import NextLink from 'next/link';
// import { useRouter } from 'next/router'; // Importa el router de Next.js
import styles from '../../styles/styleop.module.css';
import { motion } from 'framer-motion';
import Listar from '../../components/Tablas/tabla';
import Datosest from '../../components/Tablas/datosest';
import { useRouter, useSearchParams } from 'next/navigation';
import TAB from '../../components/Tablas/Tabgod/fulltab';
export default function Est() {
  const searchParams = useSearchParams(); 
  const router= useRouter();
  const Token = searchParams.get('token');
  //ejemplo de los datos
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
      id: 1222222,
      nombre: 'JuanMaestro',
      rurbo: 'Industria',
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
  //ejemplo de los datos
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
          <NextLink
            className={styles.nextEst}
            href={{ pathname: 'est/solicitud', query: `token=${Token}`}}
          >
            <Button className={styles.botNextEst} variant='light'>
              Nueva Solicitud
            </Button>
          </NextLink>
          <Button className={styles.botEst} variant='light'>
            Mis Solicitud
          </Button>
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
                <div className={styles.boxe221111}><TAB/></div>
              </div>
              <div className={styles.boxe22112}>
                <NextLink className={styles.boxe221120} href='/acp'>
                  <Button className={styles.botNextEst} variant='light'>
                    Carta de aceptacion
                  </Button>
                </NextLink>
                <div className={styles.boxe221121}> Memorias </div>
              </div>
            </div>
            <div className={styles.boxe2210}>
              <div className={styles.boxe22100}>
                <Datosest token={Token}/>
              </div>
              <div className={styles.boxe22101}>
                <Listar columns={columnsempresa} data={dataempresa} />{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


/* 
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
          <NextLink
            className={styles.nextEst}
            href={{ pathname: 'est/solicitud', query: `token=${Token}`}}
          >
            <Button className={styles.botNextEst} variant='light'>
              Nueva Solicitud
            </Button>
          </NextLink>
          <Button className={styles.botEst} variant='light'>
            Mis Solicitud
          </Button>
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
              <div className={styles.boxe22110}>Search</div>
              <div className={styles.boxe22111}>
                <Listar columns={columnsSoli} data={dataSoli} />
              </div>
              <div className={styles.boxe22112}>
                <NextLink className={styles.boxe221120} href='/acp'>
                  <Button className={styles.botNextEst} variant='light'>
                    Carta de aceptacion
                  </Button>
                </NextLink>
                <div className={styles.boxe221121}> Memorias </div>
              </div>
            </div>
            <div className={styles.boxe2210}>
              <div className={styles.boxe22100}>
                <Datosest />
              </div>
              <div className={styles.boxe22100}>
                <Listar columns={columnsempresa} data={dataempresa} />{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

*/