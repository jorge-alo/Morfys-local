import { createContext, useContext, useRef, useState } from "react"

const formContext = createContext();

export const FormProvider = ({ children }) => {

  const [fileLogo, setFileLogo] = useState("");
  const [fileBanner, setFileBanner] = useState("");
  const [comidas, setComidas] = useState(null);
   const [categoria, setCategoria] = useState('todas');
    const [inputFilter, setInputFilter] = useState("");
    const [acceptSelection, setAcceptSelection] = useState({});
    const [showModalPay, setShowModalPay] = useState(false);
  const [valueInput, setValueInput] = useState({
    comida_id: "",
    user_id: "",
    user_name: "",
    name: "",
    description: "",
    price: "",
    categoria: "",
    tamanio: 0,
    image: "",
    email: "",
    password: "",
    passwordConfirm: "",
    local: "",
    latitud: "",
    longitud: "",
    cel: "",
    variantes: [], // <--- nuevo campo
    envio: "",
    envioMinimo: "" ,
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
  });

  const inputRef = useRef(null);

  const handleChange = (e) => {
    if (e.target.type == 'file') {
       if (e.target.id === 'logo') setFileLogo(e.target.files[0]);
    if (e.target.id === 'banner') setFileBanner(e.target.files[0]);
    } else {
      setValueInput({ ...valueInput, [e.target.name]: e.target.value });
    }
    console.log(valueInput);
  }

  const resetForm = () => {
    setValueInput({
      comida_id: "",
      user_id: "",
      user_name: "",
      name: "",
      description: "",
      price: "",
      categoria: "",
      image: "",
      email: "",
      password: "",
      passwordConfirm: "",
      local: "",
      latitud: "",
      longitud: "",
      cel: "",
      tamanio: 0,
       variantes: [], // <--- nuevo campo
        envio: "",
         envioMinimo: "" ,
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
    });
    if (inputRef.current) inputRef.current.value = "";
    setFileLogo(null);
    setFileBanner(null);
  };


  return (
    <formContext.Provider value={{showModalPay, setShowModalPay, acceptSelection, setAcceptSelection, categoria, setCategoria, inputFilter, setInputFilter, inputRef, fileLogo, setFileLogo, fileBanner, setFileBanner, valueInput, setValueInput, handleChange, resetForm, comidas, setComidas }}>
      {children}
    </formContext.Provider>
  )
}

export const useForm = () => useContext(formContext);