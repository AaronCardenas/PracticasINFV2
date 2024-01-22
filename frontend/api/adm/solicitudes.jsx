import { backendUrl } from "../config";

export const AllSoli = async () => {
    try {
      const response = await fetch(`${backendUrl}/solicitud/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data.solicitudes;
      } else {
        // Maneja el caso de credenciales incorrectas
        alert("Error al cargar solicitudes");
      }
    } catch (error) {
      // Maneja errores de red o de servidor
      console.error("Error de request", error);
      alert("Se produjo un error al intentar de nuevo mas tarde");
    }
  };