import { backendUrl} from "./config";
export const funcionlogin = async (rut, password,userType,isValid,setIsLoading,router) => {
  const userData = {
    rut: rut.raw,
    password: password,
    userType: userType
  };

  console.log(rut.raw);
  if (!isValid || !rut.raw || !password) {
    alert("Rut o contraseña inválidos");
    return; // Evitar iniciar sesión si el RUT no es válido
  }
  if(userType === "sup"){
    const userData = {
      email: rut,
      password: password,
      userType: userType
    };
  }
  else{
    if (!isValid || !rut.raw || !password) {
      alert("Rut o contraseña inválidos");
      return; // Evitar iniciar sesión si el RUT no es válido
    }
    const userData = {
      rut: rut.raw, // rut.raw=(20111111-5);rut.formatted=(20.111.111-5)
      password: password,
      userType: userType
    };
  }
  try {
    setIsLoading(true);
    const response = await fetch(`${backendUrl}/usuario/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      localStorage.setItem('token', token);
      router.push(`/${userType}`); // cambiar al implementar tipos de usuario //userType
    } else {
      // Maneja el caso de credenciales incorrectas
      alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
    }
  } catch (error) {
    // Maneja errores de red o de servidor
    console.error("Error al iniciar sesión:", error);
    alert(
      "Se produjo un error al intentar iniciar sesión. Por favor, inténtalo más tarde."
    );
  } finally {
    setIsLoading(false);
  }
};