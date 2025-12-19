import { useState } from "react"

import { DataContext } from "./DataContext";
import { apiAddStandAll, cargarComidasApi, destroyApi, getAllData, getDataChartApi, getPreferencePayApi, getUsersApi, handleSetTimeApi, resetPasswordApi, sendDataNewUserApi, sendPorcentageApi, updateDataApi } from "../api/request.api";


export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);


  const handleUpdate = async (formData) => {
    console.log("valor de formData en dataProvider", formData)
    try {
      const result = await updateDataApi(formData);
      console.log(result);
    } catch (error) {
      setError(error);
    }
  }

  const handleUpdateBanner = async (formData) => {

  }
  const handleCargarComidas = async (formData) => {
    console.log("valor de formData en handleCargarDatos", formData);
    try {
      const result = await cargarComidasApi(formData);
      console.log("valor de result en DataProvider", result);
    } catch (error) {
      setError(error)
      console.log(error);
    }
  }
  const handleSetTime = async (formData) => {
    try {
      const response = await handleSetTimeApi(formData);
    } catch (error) {
      console.log('Error:', error);
    }

  }


  const handleGetData = async (local) => {
    console.log("valor de userId en dataProvidre", local);
    try {
      const result = await getAllData(local);
      console.log("valoe de result en dataProvider", result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  const handleDestroy = async (id) => {
    try {
      const result = await destroyApi(id);
    } catch (error) {
      console.log(error);
    }
  }

  const addStandbyAll = async (categoria, data) => {
    try {
      const response = await apiAddStandAll(categoria, data);
      return response
    } catch (error) {
      console.log("Error:", error);
    }
  }

  const sendPorcentage = async (itemsPrice) => {
    try {
      const response = await sendPorcentageApi(itemsPrice);
    } catch (error) {
      console.log("Error:", error);
    }

  }
  const handleResetPassword = async (password, token) => {
    try {
      const response = await resetPasswordApi(password, token)
      return response
    } catch (error) {
      console.log("ERROR:", error);
    }
  }

  const getUsers = async () => {
    try {
      const response = await getUsersApi()
      return response.data
    } catch (error) {
      console.log("ERROR:", error);
    }
  }
  const sendDataNewUser = async (value) => {
    try {
      const response = await sendDataNewUserApi(value);
      return response;
    } catch (error) {
      console.log("ERROR:", error);
    }
  }
  const getPreferencePay = async ({userId}) => {
    try {
      const response = await getPreferencePayApi({userId});
      console.log("Valor de response en getPreferencePay", response);
      return response;
    } catch (error) {
      console.log("Error:", error);
    }
    
  }

  const getDataChart = async(idLocal) => {
    try {
      const result = await getDataChartApi(idLocal);
      return result;
    } catch (error) {
      console.log("Error:", error);
    }
    
  }
  return (
    <DataContext.Provider value={{getDataChart, getPreferencePay, sendDataNewUser, getUsers, handleResetPassword, sendPorcentage, addStandbyAll, handleSetTime, handleUpdateBanner, handleDestroy, setError, handleGetData, handleCargarComidas, handleUpdate }}>
      {children}
    </DataContext.Provider>
  )
}

