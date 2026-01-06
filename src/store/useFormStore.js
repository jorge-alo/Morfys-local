import { create } from 'zustand';

const initialFormValues = {
    comida_id: "",
    user_id: "",
    user_name: "",
    name: "",
    description: "",
    price: "",
    categoria: "",
    tamanio: 0,
    image: null,
    email: "",
    password: "",
    passwordConfirm: "",
    local: "",
    latitud: "",
    longitud: "",
    celNumero: "",
    active_untill: null,
    celPais: "",
    celProvincia: "",
    variantes: [], // <--- nuevo campo
    envio: "",
    envioMinimo: "",
    diaMañanaEntrada: "",
    diaMañanaSalida: "",
    horarioManianaEntrada: "",
    horarioManianaSalida: "",
    diaTardeEntrada: "",
    diaTardeSalida: "",
    horarioTardeEntrada: "",
    horarioTardeSalida: "",
    diaDifMañanaEntrada: "",
    horarioDifMañanaEntrada: "",
    horarioDifMañanaSalida: "",
    diaDifTardeEntrada: "",
    horarioDifTardeEntrada: "",
    horarioDiftardeSalida: ""
}

export const useFormStore = create((set) => ({
// ESTADOS
  valueInput: initialFormValues,
  fileLogo: null,
  fileBanner: null,
  imageFile: null,
  comidas: null,
  categoria: 'todas',
  inputFilter: "",
  showModalPay: false,
  acceptSelection: {},

  // ACCIONES (Funciones)
  setComidas: (comidas) => set({ comidas }),
  setCategoria: (categoria) => set({ categoria }),
  setInputFilter: (text) => set({ inputFilter: text }),
  setShowModalPay: (bool) => set({ showModalPay: bool }),
  setAcceptSelection: (selection) => set({ acceptSelection: selection}),
  setValueInput: (newValue) => set((state) => ({
    valueInput: {
      ...state.valueInput,
      ...(typeof newValue === 'function' ? newValue(state.valueInput) : newValue)
    }
  })),

  handleAcceptSelection: (item, checked, op = null) => 
  set((state) => {
    const key = (item.tamanio == 1 || item.price == 0) 
                ? `op-${op?.id}` 
                : `item-${item.id}`;
                
    return {
      acceptSelection: {
        ...state.acceptSelection,
        [key]: checked
      }
    };
  }),

  // Manejador de cambios universal
  handleChange: (e) => {
    const { name, value, type, files, id } = e.target;

    if (type === 'file') {
      if (id === 'logo') set({ fileLogo: files[0] });
      if (id === 'banner') set({ fileBanner: files[0] });
      if (id === 'image') set({ imageFile: files[0] });
    } else {
      set((state) => ({
        valueInput: {
          ...state.valueInput,
          [name]: value,
        },
      }));
    }
  },

  resetForm: () => set({
    valueInput: initialFormValues,
    fileLogo: null,
    fileBanner: null
  }),

  setFormValues: (user) => set((state) => ({
  valueInput: {
    ...state.valueInput,
    // Mapeamos 'nombre' del backend a 'name' que usa tu input
    name: user.nombre || "", 
    email: user.email || "",
    // El password normalmente no se carga por seguridad
    password: "" 
  }
})),
}));