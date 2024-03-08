import { backendUrl } from "../config";

export const AllSoli = async (Token) => {
  const Data = {
    token: Token,
  };
  try {
    const response = await fetch(`${backendUrl}/solicitud/supXest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });
    if (response.ok) {
      const data = await response.json();
      return data.practicantes;
    } else {
      // Maneja el caso de credenciales incorrectas
      alert("Error al cargar practicantes");
    }
  } catch (error) {
    // Maneja errores de red o de servidor
    console.error("Error de request", error);
    alert("Se produjo un error al intentar de nuevo mas tarde");
  }
};

export const actualizarFaseSolicitud = async (idSolicitud, nroFase, motivoRechazo = null) => {

  try {
    const response = await fetch(`${backendUrl}/solicitud/actualizar/${idSolicitud}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ nroFase: nroFase, idSolicitud, motivoRechazo: motivoRechazo}),

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
