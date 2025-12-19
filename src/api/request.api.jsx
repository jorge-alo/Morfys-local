import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 🔥 Interceptor para mandar el token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const updateLoginApi = async (login) => {
  return await api.post('/login', login)
}

export const sendDataNewUserApi = async (value) => {
  return await api.post('/addUser', value)
}

export const logOutApi = async () => {
  return await api.post('/logout')
}

export const resetPasswordApi = async (password, token) => {
  return await api.post(`/reset-password/${token}`, { password });
}

export const forgotEmailApi = async (email) => {
  return await api.post('/forgotEmail', { email })
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
  return await api.put('/standbyAll', { categoria, data });
}

export const sendPorcentageApi = async (data) => {
  return await api.put('/porcentage', data);
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

export const getPreferencePayApi = async ({ userId }) => {
  return await api.post('/preference', { userId });
}

export const checkPayAPi = async () => {
  return await api.get("/checkPay");
}

export const getDataChartApi = async (localId, periodo) => {
  return await api.get(`/chart/${localId}`, {
    params: { periodo } // Esto generará: /chart/123?periodo=7d
  });
}

export const getLocalesApi = async () => {
  return await api.get("/restaurantes");
}





