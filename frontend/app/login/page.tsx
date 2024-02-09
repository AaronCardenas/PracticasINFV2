"use client";
import React, { useState } from "react";
import { EyeFilledIcon } from "../../components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../components/EyeSlashFilledIcon";
import { Input, Button, Spinner } from "@nextui-org/react";
import { useRut } from "react-rut-formatter";
import { useRouter, useSearchParams } from "next/navigation"; // Importa el router de Next.js
import styles from '../../styles/styleop.module.css';
import { motion } from "framer-motion";
import {funcionlogin} from '../../api/standar';
export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const { rut, updateRut, isValid } = useRut();
  const [password, setPassword] = useState("");
  const router = useRouter();
  // seteo de userType
  const searchParams = useSearchParams();

  const userType = searchParams.get("userType");
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Si se presiona Enter, realiza la misma función que el botón Ingresar
      funcionlogin(rut, password,userType,isValid,setIsLoading,router);
    }
  };
  const reg=()=>{
    router.push(`/register`);
  }
  return (
    <div className={styles.logincontainer}>
      <span id='span1'></span>
      <span id='span2'></span>
      <span id='span3'></span>
      <form id="singinForm" className={styles.form}>
        <h2>Login</h2>
        <Input classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focused=true]:bg-default-200/50",
            "dark:group-data-[focused=true]:bg-default/60",
            "!cursor-text",
          ],
        }} className={styles.loginInput} label='Rut' labelPlacement='outside' size="lg" 
        value={rut.formatted}
          errorMessage={!isValid && rut.formatted && "Please enter a valid Rut"}
          onValueChange={(newValue) => updateRut(newValue)}
          color={(!isValid && rut.formatted) ? "danger" : "default"}
          maxLength={12}
          onKeyDown={handleKeyDown}
          ></Input>
        <Input classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focused=true]:bg-default-200/50",
            "dark:group-data-[focused=true]:bg-default/60",
            "!cursor-text",
          ],
        }} className={styles.loginInput} label='Contraseña' labelPlacement='outside'size="lg" type={isVisible ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        maxLength={24}
        onKeyDown={handleKeyDown}
        endContent={
          <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>}
      />
        <a className={styles.logina} href="#">Olvidaste tu contraseña?</a>
        <a className={styles.logina} href="#" id='signup' onClick={reg}>Registrarse</a>
        <div className={styles.bloqueboton}>
          {loginError && (
            <div className="text-danger">{loginError}</div>
          )}
          {isLoading ? (
            <Spinner color="secondary" size="lg"/>
          ) : (
            <Button className={styles.loginBoton} onClick={() => funcionlogin(rut, password, userType, isValid, setIsLoading, router)} disabled={isLoading}>
              {isLoading ? 'Ingresando...' : 'Ingresar'}
            </Button>
          )}
        </div>
      </form>
    </div>
    
  );
}
/*

<motion.div
      initial={{ scale: 0 }}
      animate={{ rotate: 360, scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 160,
        damping: 20
      }} 
      classNameName={styles.bloqueLogin}>
      <div classNameName={styles.Inputs}>
        <Input
          classNameName={styles.Input}
          size='lg'
          value={rut.formatted}
          type="rut"
          label="Rut"
          variant="faded"
          labelPlacement='outside'
          errorMessage={!isValid && rut.formatted && "Please enter a valid Rut"}
          onValueChange={(newValue) => updateRut(newValue)}
          color={(!isValid && rut.formatted) ? "danger" : "default"}
          maxLength={12}
          onKeyDown={handleKeyDown}
        />
        <Input
          classNameName={styles.Input}
          size='lg'
          label="Password"
          variant="faded"
          labelPlacement='outside'
          type={isVisible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={24}
          onKeyDown={handleKeyDown}
          endContent={
            <button classNameName="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <EyeSlashFilledIcon classNameName="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon classNameName="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>}
        />
        <div classNameName="mt-8">
          {loginError && (
            <div classNameName="text-danger">{loginError}</div>
          )}
          {isLoading ? (
            <Spinner size="lg" />
          ) : (
            <Button classNameName={styles.next} onClick={funcionlogin} disabled={isLoading}>
              {isLoading ? 'Ingresando...' : 'Ingresar'}
            </Button>
          )}
        </div>
      </div>
      
    </motion.div>
*/
