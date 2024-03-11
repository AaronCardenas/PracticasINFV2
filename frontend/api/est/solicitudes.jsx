import { backendUrl } from "../config";
export const solicitudes = async (token,datos) => {
  const Data = {
    token: token,
    datos: datos,
  };
  try {
    const response = await fetch(`${backendUrl}/solicitud/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
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
export const PDF = async (Token, selectedEmpresaId, asignatura) => {
  // Configurar los datos para la solicitud a la API
  if (!selectedEmpresaId) {
    alert("Selecciona una empresa antes de solicitar");
    return;
  }

  const Data = {
    token: Token,
    rutEmpresa: selectedEmpresaId,
    asignatura: asignatura,
  };
  console.log("Data", Data);
  // Realiza la solicitud a la API
  try {

    // console.log("Data", Data);
    const response = await fetch(`${backendUrl}/utils/unirDatos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });

    if (response.ok) {
      const blob = await response.blob();

      // Crear una URL para el blob
      const blobUrl = URL.createObjectURL(blob);

      // Abrir una nueva ventana y realizar la descarga
      window.open(blobUrl, "_blank");
      // console.log('response', response);
    } else {
      // Maneja el caso de credenciales incorrectas
      alert("Error al recibir respuesta.");
    }
  } catch (error) {
    // Maneja errores de red o de servidor
    console.error("No funciono fetch:", error);
    alert("Error.");
  }
};
export const funcionSave = async (dataToSave) => {
  // Configurar los datos para la solicitud a la API
  const Data = {
    rutEmpresa: dataToSave.rutEmpresa,
    razonSocial: dataToSave.razonsocial,
    direccion: dataToSave.direccion,
    ciudad: dataToSave.ciudad,
    region: dataToSave.region,
    rubro: dataToSave.rubro,
  };
  // Realiza la solicitud a la API
  try {
    const response = await fetch(`${backendUrl}/empresa/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });

    if (response.ok) {
      alert("Empresa creada correctamente");
    } else {
      // Maneja el caso de credenciales incorrectas
      alert("Error al recibir respuesta.");
    }
  } catch (error) {
    // Maneja errores de red o de servidor
    console.error("No funciono fetch:", error);
    alert("Error.");
  }
};
export const datosEst = async (token) => {
  const Data = {
    token: token,
  };
  try {

    const response = await fetch(`${backendUrl}/usuario/verDatos`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });

    if (response.ok) {
      const dato = await response.json();
      const data = dato.usuario;
      return data;
    } else {
      alert("Error al recibir respuesta.");
    }
  } catch (error) {
    // Maneja errores de red o de servidor
    console.error("No funciono fetch:", error);
    return null;
  }
};
export const datosEMP = async (idSolicitud) => {
  const Data = {
    idSolicitud: idSolicitud,
  };
  try {

    const response = await fetch(`${backendUrl}/empresa/getEmpresa`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });

    if (response.ok) {
      const empresa = await response.json();
      return empresa;
    } else {
      alert("Error al recibir respuesta.");
    }
  } catch (error) {
    // Maneja errores de red o de servidor
    console.error("No funciono fetch:", error);
    return null;
  }
};
export const actualizarDatosUsuario = async (token, nuevosDatos) => {
  try {
    const response = await fetch(`${backendUrl}/usuario/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        datos: nuevosDatos,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Puedes devolver la respuesta del servidor si es necesario
    } else {
      throw new Error("Error al actualizar datos del usuario");
    }
  } catch (error) {
    console.error("Error en la solicitud al servidor:", error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};
export const AllestSoli = async (token) => {
  const Data = {
    token: token,
  };
  try {

    const response = await fetch(`${backendUrl}/solicitud/listaSolicitudes`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
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
export const extarerEmpresa = async (token, idSolicitud) => {
  try {
    const response = await fetch(`${backendUrl}/empresa/getEmpresa`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        idSolicitud: idSolicitud
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Puedes devolver la respuesta del servidor si es necesario
    } else {
      throw new Error("Error al actualizar datos del usuario");
    }
  } catch (error) {
    console.error("Error en la solicitud al servidor:", error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};
export const All_EMP = async () => {
  try {
    const response = await fetch(`${backendUrl}/empresa/listar`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
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