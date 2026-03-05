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
  return await api.post('/users/login', login)
}

export const sendDataNewUserApi = async (value) => {
  return await api.post('users/addUser', value)
}

export const logOutApi = async () => {
  return await api.post('users/logout')
}

export const resetPasswordApi = async (password, token) => {
  return await api.post(`/users/reset-password/${token}`, { password });
}

export const forgotEmailApi = async (email) => {
  return await api.post('/users/forgotEmail', { email })
}

export const verifyTokenApi = async () => {
  return await api.get(`user/verify-token`);
}

export const getAllData = async (local) => {
  console.log("valor de userId en api", local);
  return await api.get(`comidas/comidas?local=${local}`);
}
export const updateDataApi = async (data) => {
  return await api.put('comidas/update', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const cargarComidasApi = async (data) => {
  return await api.post('comidas/cargarcomidas', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const destroyApi = async (id, opId) => {
  // Si opId existe, lo agregamos como parámetro de consulta
  const url = opId ? `comidas/destroy/${id}?opId=${opId}` : `/destroy/${id}`;
  return await api.delete(url);
}

export const apiAddStandAll = async (categoria, data) => {
  return await api.put('comidas/standbyAll', { categoria, data });
}

export const sendPorcentageApi = async (data) => {
  return await api.put('comidas/porcentage', data);
}

export const updateUserDataApi = async ({value, id}) => {
  return await api.put('users/updateUser', {value, id});
}

export const handleSetTimeApi = async (data) => {
  return await api.put('restaurant/horario', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export const sendDataNewLocalApi = async (data) => {
  return await api.put('restaurant/addLocal', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const getUsersApi = async () => {
  return await api.get("users/users");
}

export const getPreferencePayApi = async ({ userId }) => {
  return await api.post('mercado/preference', { userId });
}

export const checkPayAPi = async () => {
  return await api.get("users/checkPay");
}

export const getDataChartApi = async (localId, periodo) => {
  return await api.get(`pedidos/chart/${localId}`, {
    params: { periodo } // Esto generará: /chart/123?periodo=7d
  });
}

export const getLocalesApi = async () => {
  return await api.get("restaurant/restaurantes");
}





