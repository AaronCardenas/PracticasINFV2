import React, { useState, useEffect } from "react";
import {
  Select,
  Button,
  Input,
  SelectItem,
} from "@nextui-org/react";
import styles from '../../styles/styleop.module.css'
import { datosEst,actualizarDatosUsuario} from "../../api/est/solicitudes";
export default function Datosest({token}) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await datosEst(token);
        setData(data);setFormData(data);
        console.log("Datos del usuario:", data);
        console.log("Datos update usuario:", formData);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      }
    };
    fetchData();
  }, [token]);
  const editardatos = () => {
    if (!isDisabled) {
      alert("Se modificaron los datos");
    }
    setIsDisabled(!isDisabled);
  };

  const actualizarDatosEnBackend = async () => {
    try {
      // Llama a la función para actualizar datos en el backend
      console.log("Datos a actualizar:", formData);
      await actualizarDatosUsuario(token, formData);
      alert("Datos actualizados exitosamente");
    } catch (error) {
      alert("Error al actualizar datos del usuario");
    }
  };
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1979 },
    (_, index) => currentYear - index
  );
  const planesDeCarrera = ["Plan A", "Plan B", "Plan C", "Plan D", "Plan E"];
  const [selectedPlan, setSelectedPlan] = useState(data.planEstudio);
  const [selectedIngreso, setSelectedIngreso] = useState(data.ingreso);
  return (
    <div className={styles.datosest}>
      <p className={styles.Titulo}>Datos del alumno</p>
      <Input
        className={styles.Textacept}
        type="name"
        label="Primer nombre:"
        placeholder={data.nombre1}
        isDisabled={isDisabled}
      />
      <Input
        className={styles.Textacept}
        type="name"
        label="Segundo nombre:"
        placeholder={data.nombre2}
        isDisabled={isDisabled}
      />
      <Input
        className={styles.Textacept}
        type="name"
        label="Primer apellido:"
        placeholder={data.apellido1}
        isDisabled={isDisabled}
      />
      <Input
        className={styles.Textacept}
        type="name"
        label="Segundo apellido:"
        placeholder={data.apellido2}
        isDisabled={isDisabled}
      />
      
      <Input
        className={styles.Textacept}
        type="rut"
        label="Rut"
        placeholder={data.rut}
        isDisabled
      />
      <Input
        className={styles.Textacept}
        type="email"
        label="Email"
        placeholder={data.correo}
        isDisabled
      />
      <Input
        className={styles.Textacept}
        type="fono"
        label="Fono"
        placeholder={data.telefono}
        isDisabled={isDisabled}
      />
      <Select
        className={styles.Textacept}
        isDisabled={isDisabled}
        disabled={isDisabled}
        label="Plan de estudio"
        placeholder={data.planEstudio}
        value={data.planEstudio}
        onChange={(value) => {
          setSelectedPlan(value);
          // Agrega la lógica necesaria para manejar el cambio de valor
          console.log("Plan seleccionado:", value);
        }}
      >
        {planesDeCarrera.map((plan) => (
          <SelectItem key={plan} value={plan}>
            {plan}
          </SelectItem>
        ))}
      </Select>

      <Select
        className={styles.Textacept}
        isDisabled={isDisabled}
        label="Año de ingreso"
        placeholder={data.ingreso}
        value={data.ingreso}
        onChange={(value) => {
          setSelectedIngreso(value);
          // Agrega la lógica necesaria para manejar el cambio de valor
          console.log("Año de ingreso seleccionado:", value);
        }}
      >
        {years.map((year) => (
          <SelectItem key={year} value={year} textValue={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </Select>
      <Button
          size="lg"
          onClick={() => {
            editardatos();
            // Llama a la función de actualización cuando se habilita la edición
            if (!isDisabled) {
              actualizarDatosEnBackend();
            }
          }}
          className={
            isDisabled
              ? "text-white bg-gradient-to-r from-blue-500 to-violet-500"
              : "text-white bg-gradient-to-r from-red-500 to-violet-500"
          }
        >
          {isDisabled ? "Habilitar Edición" : "Guardar Cambios"}
        </Button>
    </div>
  );
}
