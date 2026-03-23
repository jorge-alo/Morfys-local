import { create } from 'zustand'
import { apiAddStandAll, cargarComidasApi, deleteUserApi, destroyApi, getAllData, getDataChartApi, getLocalesApi, getPreferencePayApi, getUsersApi, handleSetTimeApi, resetPasswordApi, sendDataNewLocalApi, sendDataNewUserApi, sendPorcentageApi, updateDataApi, updateUserDataApi } from '../api/request.api';

export const useDataStore = create((set, get) => ({
  error: null,
  users: [],
  setError: (error) => set({ error }),
  standby: false,
  setStandbyState: (value) => set({ standby: value }),

  handleDeleteUser: async (id) => {
    try {
      const response = await deleteUserApi(id)
      if (response.data.status === 'ok') {
        // Usamos 'state' para acceder a la lista actual de usuarios
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
          error: null // Limpiamos errores previos si sale bien
        }));
      }
    } catch (error) {
      set({ error: error.message })
    }
  },

  handleUpdate: async (formData) => {
    console.log("valor de formData en dataProvider", formData)
    try {
      const result = await updateDataApi(formData);
      set({ error: null });
      return result;
    } catch (error) {
      set({ error: error.message || "Error al actualizar" });
    }
  },

  handleCargarComidas: async (formData) => {
    console.log("valor de formData en handleCargarDatos", formData);
    try {
      const result = await cargarComidasApi(formData);
      set({ error: null });
      return result;
    } catch (error) {
      set({ error: error.message || "Error al actualizar" });
    }
  },
  handleSetTime: async (formData) => {
    try {
      const response = await handleSetTimeApi(formData);
      set({ error: null });
      return response;
    } catch (error) {
      set({ error: error.message || "Error al actualizar" });
    }

  },

  handleGetData: async (local) => {
    console.log("valor de userId en dataProvidre", local);
    try {
      const result = await getAllData(local);
      set({
        error: null,
        standby: result.data.standby // 🔥 CLAVE
      });
      console.log("valoe de result en dataProvider", result);
      return result;
    } catch (error) {
      set({ error: error.message || "Error al actualizar" });
    }
  },

  handleDestroy: async (id, opId = null) => {
    try {
      const result = await destroyApi(id, opId);
      set({ error: null });
      return result;
    } catch (error) {
      set({ error: error.message || "Error al actualizar" });
    }
  },

  addStandbyAll: async (categoria, data) => {
    try {
      const response = await apiAddStandAll(categoria, data);
      set({ error: null });
      return response
    } catch (error) {
      set({ error: error.message || "Error al actualizar" });
    }
  },

  sendPorcentage: async (itemsPrice) => {
    try {
      const response = await sendPorcentageApi(itemsPrice);
      set({ error: null });
      return response
    } catch (error) {
      set({ error: error.message || "Error al actualizar" });
    }

  },
  handleResetPassword: async (password, token) => {
    try {
      const response = await resetPasswordApi(password, token)
      set({ error: null });
      return response
    } catch (error) {
      set({ error: error.message || "Error al actualizar" });
    }
  },

  getUsers: async () => {
    try {
      const response = await getUsersApi()
      set({
        users: response.data.users,
        error: null
      });

    } catch (error) {
      set({ error: error.message || "Error al actualizar" });
    }
  },
  sendDataNewUser: async (value) => {
    try {
      const response = await sendDataNewUserApi(value);
      set({ error: null });
      if (response.data.status === "OK") {
        await get().getUsers();
      }
      return response;
    } catch (error) {
      // 🛡️ Extraemos el mensaje real enviado por el backend (res.json)
      const serverMessage = error.response?.data?.message || "Error al procesar la solicitud";

      set({ error: serverMessage });
      console.error("Error detallado:", error.response?.data);

      // Retornamos algo para que el hook no intente cerrar el modal
      return null;
    }
  },
  updateUserData: async (value, id) => {
    try {
      const response = await updateUserDataApi({ value, id });
      set({ error: null });
      if (response.data.status == "OK") {
        await get().getUsers();
      }
      return response;
    } catch (error) {
      set({ error: error.message || "Error al actualizar" });
    }
  },
  getPreferencePay: async ({ userId }) => {
    try {
      const response = await getPreferencePayApi({ userId });
      set({ error: null });
      console.log("Valor de response en getPreferencePay", response);
      return response;
    } catch (error) {
      set({ error: error.message || "Error al actualizar" });
    }

  },

  getDataChart: async (idLocal, periodo) => {
    try {
      const result = await getDataChartApi(idLocal, periodo);
      set({ error: null });
      return result;
    } catch (error) {
      set({ error: error.message || "Error al actualizar" });
    }

  },

  getLocales: async () => {
    try {
      const result = await getLocalesApi();
      set({ error: null });
      return result;
    } catch (error) {
      set({ error: error.message || "Error al actualizar" });
    }
  },
  sendDataNewLocal: async (localData) => {
    try {
      const response = await sendDataNewLocalApi(localData);
      await get().getLocales(); // Actualiza la tabla de locales
      return response.data;
    } catch (error) {
      console.error("Error al crear local");
      console.error(error.response.data);
    }
  },
  setStandby: async (standby) => {
    try {
      const response = await setStandbyApi(standby);
      set({ error: null });
      return response.data;
    } catch (error) {
      set({ error: error.message || "Error al actualizar standby" });
    }
  },
}))


