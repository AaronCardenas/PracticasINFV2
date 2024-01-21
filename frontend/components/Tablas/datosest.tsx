import React, { useState, useEffect } from "react";
import {
  Select,
  Button,
  ButtonGroup,
  Input,
  SelectItem,
} from "@nextui-org/react";
import styles from '../../styles/styleop.module.css'
export default function Datosest() {
  const data = {
    name: "Juan",
    rut: "12345678-9",
    email: "@email",
    fono: "+569123456789",
    plan: "Plan C",
    ingreso: "2019",
  };
  const [formData, setFormData] = useState(data);
  const [isDisabled, setIsDisabled] = useState(true);
  const editardatos = () => {
    if (isDisabled!) alert("Se modificaran los datos del estudiante");
    setIsDisabled(!isDisabled);
  };
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1979 },
    (_, index) => currentYear - index
  );
  const planesDeCarrera = ["Plan A", "Plan B", "Plan C", "Plan D", "Plan E"];

  const [selectedPlan, setSelectedPlan] = useState(data.plan);
  const [selectedIngreso, setSelectedIngreso] = useState(data.ingreso);

  useEffect(() => {
    // Actualiza los datos de formData cuando cambia selectedPlan o selectedIngreso
    setFormData((prevData) => ({
      ...prevData,
      plan: selectedPlan,
      ingreso: selectedIngreso,
    }));
  }, [selectedPlan, selectedIngreso]);

  return (
    <div className={styles.datosest}>
      <p className={styles.Titulo}>Datos del alumno</p>
      <Input
        className={styles.Textacept}
        type="name"
        label="Nombre completo:"
        placeholder={data.name}
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
        placeholder={data.email}
        isDisabled
      />
      <Input
        className={styles.Textacept}
        type="fono"
        label="Fono"
        placeholder={data.fono}
        isDisabled={isDisabled}
      />
      <Select
        className={styles.Textacept}
        isDisabled={isDisabled}
        disabled={isDisabled}
        label="Plan de estudio"
        placeholder={selectedPlan}
        value={selectedPlan}
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
        placeholder={selectedIngreso}
        value={selectedIngreso}
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
      <ButtonGroup>
        <Button
          onClick={editardatos}
          className={
            isDisabled
              ? "text-white bg-gradient-to-r from-blue-500 to-violet-500"
              : "text-white bg-gradient-to-r from-red-500 to-violet-500"
          }
        >
          {isDisabled ? "Habilitar Edición" : "Guardar Cambios"}
        </Button>
      </ButtonGroup>
    </div>
  );
}
