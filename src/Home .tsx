import { createContext, useContext, useState } from "react"

const CycleContext =  createContext({} as any)

export function NewCycleForm(){
    const { activeCycle, setActiveCycle } = useContext(CycleContext)

    return (
    <h1>
        NewCycleForm: {activeCycle}
        <button onClick={()=> setActiveCycle(activeCycle+1)}>Alterar Ciclo ativo</button>
    </h1>
    )
}

export function Countdown(){
    const { activeCycle, setActiveCycle } = useContext(CycleContext)
    return <h1>Countdown: {activeCycle}</h1>
}

export function Home(){
    const [activeCycle, setActiveCycle ] = useState(0)

    return (
        <CycleContext.Provider value={{activeCycle, setActiveCycle}}>
        <div>
            <NewCycleForm/>
            <Countdown/>
        </div>
        </CycleContext.Provider>
    )
}