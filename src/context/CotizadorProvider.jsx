import { createContext, useState } from "react";
import {
    obtenerDiferenciaYear,
    calcularMarca,
    calcularPlan,
    formatearDinero
} from "../helpers";

const CotizadorContext = createContext()

const CotizadorProvider = ({ children }) => {

    //mi objeto
    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })

    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)

    const handleChangeDatos = e => {
        setDatos({
            ...datos, //tomas el objeto como estaba antes
            [e.target.name]: e.target.value //reescribe la propiedad
        })
    }

    const cotizarSeguro = () => {
        //base
        let resultado = 2000

        //obtener diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year)

        //restamos 3% por cada año
        resultado -= ((diferencia * 3) * resultado) / 100

        //Europeo 30%
        //Americano 15%
        //Astiatico 5%
        resultado *= calcularMarca(datos.marca)

        //Completo 50%
        //Basico 20%
        resultado *= calcularPlan(datos.plan)

        // resultado = resultado.toFixed(2)

        //Formatear dinero
        resultado = formatearDinero(resultado)
        
        setCargando(true)
        
        setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
        }, 2000)
    }


    return (

        <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error,
                setError,
                cotizarSeguro,
                resultado,
                cargando
            }}
        >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}

export default CotizadorContext
