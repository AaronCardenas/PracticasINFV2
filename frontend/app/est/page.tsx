'use client';
import React, { useState, useEffect } from 'react';
import { Button, Image } from '@nextui-org/react';
import NextLink from 'next/link';
// import { useRouter } from 'next/router'; // Importa el router de Next.js
import styles from '../../styles/styleop.module.css';
import Datosest from '../../components/Tablas/datosest';
import { useRouter, useSearchParams } from 'next/navigation';
import TAB from '../../components/Tablas/TabEST/fulltab';
import { AllestSoli } from '../../api/est/solicitudes';
export default function Est() {
  const searchParams = useSearchParams(); 
  const router= useRouter();
  const Token = searchParams.get('token');
  const [data, setData] = useState([]);
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
                empresa tab
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


/* 
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
import TAB from '../../components/Tablas/TabEST/fulltab';
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
    ;
  const dataempresa = [
    {
      id: 1222222,
      nombre: 'JuanMaestro',
      rurbo: 'Industria',
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
                <div className={styles.boxe221111}>
                  
                </div>
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

*/