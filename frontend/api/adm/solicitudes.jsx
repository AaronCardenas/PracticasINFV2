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

export const actualizarFaseSolicitud = async (idSolicitud, nuevaFase, rechazo) => {
  try {
    const response = await fetch(`${backendUrl}/solicitud/?${idSolicitud}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ nuevaFase: nuevaFase, rechazo: rechazo }),

    });

    if (!response.ok) {
      throw new Error('Error al actualizar la fase de la solicitud');
    }

    const data = await response.json();
    console.log(data.message);
    
  } catch (error) {
    console.error("Error al actualizar la fase", error);
    alert("Error al actualizar. Intente de nuevo más tarde.");
  }
};
