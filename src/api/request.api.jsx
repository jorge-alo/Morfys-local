import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const updateLoginApi = async (login) => {
  return await api.post('/login', login)
}

export const sendDataNewUserApi = async (value) => {
  return await api.post('/addUser', value)
}

export const resetPasswordApi = async (password, token) => {
  return await api.post(`/reset-password/${token}`, {password});
}

export const forgotEmailApi = async (email) => {
  return await api.post('/forgotEmail', {email})
}

export const verifyTokenApi = async () => {
  return await api.get(`/verify-token`);
}

export const getAllData = async (local) => {
  console.log("valor de userId en api", local);
  return await api.get(`/comidas?local=${local}`);
}
export const updateDataApi = async (data) => {
  return await api.put('/update', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const cargarComidasApi = async (data) => {
  return await api.post('/cargarcomidas', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const destroyApi = async (id) => {
  return await api.delete(`/destroy/${id}`);
}

export const apiAddStandAll = async (categoria, data) => {
  return await api.put('/standbyAll', {categoria, data} );
}

export const sendPorcentageApi = async (data) => {
  return await api.put('/porcentage', data );
}

export const handleSetTimeApi = async (data) => {
  return await api.put('/horario', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const getUsersApi = async () => {
  return await api.get("/users");
}



