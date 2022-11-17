import { createContext, ReactNode, useState, useReducer } from "react";

interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interruptedDate?: Date,
    finishedDate?: Date
}

interface CreateNewCycleData{
    task: string
    minutesAmount: number
}

interface CyclesContextType {
    cycles: Cycle[],
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    markCurrentCycleAsFinished: () => void
    amountSecondsPassed: number
    setSecondsPassed: (seconds: number) => void
    createNewCycle: (data: CreateNewCycleData) => void,
    interruptCurrentCycle: ()=> void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CyclesContextProviderProps{
    children: ReactNode
}

export function CycleContextProvider({children}:CyclesContextProviderProps) {
    const [cycles, dispath] = useReducer((state: Cycle[], action: any)=> {
        if(action.type === "ADD_NEW_CYCLE"){
            return [...state, action.payload.newCycle]
        }
        return state
    }, [])


    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function markCurrentCycleAsFinished(){
        // setCycles(state=> state.map((cycle)=>{
        //     if(cycle.id === activeCycleId){
        //         return { ...cycle, finishedDate: new Date() }
        //     }else{
        //         return cycle
        //     }
        // }))

        dispath({
            type: "MARK_CURRENT_CYCLE_AS_FINISHED",
            payload: {
                 activeCycleId
            }
        })
    }

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds)
    }

    function createNewCycle(data: CreateNewCycleData) {
        const id = String(new Date().getTime())
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        dispath({
            type: "ADD_NEW_CYCLE",
            payload: {
                newCycle
            }
        })

        // setCycles((state) => [...state, newCycle])
        setActiveCycleId(newCycle.id)
        setAmountSecondsPassed(0)
        // reset()
    }
    // console.log(formState.errors)

    function interruptCurrentCycle() {

        dispath({
            type: "INTERRUPT_CURRENT_CYCLE",
            payload: {
                activeCycle
            }
        })

        // setCycles(state => state.map((cycle) => {
        //     if (cycle.id === activeCycleId) {
        //         return { ...cycle, interruptedDate: new Date() }
        //     } else {
        //         return cycle
        //     }
        // }))

        setActiveCycleId(null)
    }

    return (
        <CyclesContext.Provider
            value={{activeCycle,
                    activeCycleId,
                    markCurrentCycleAsFinished,
                    amountSecondsPassed,
                    setSecondsPassed,
                    createNewCycle,
                    interruptCurrentCycle,
                    cycles
                    }}>
                    {children}
        </CyclesContext.Provider>
                    
        
)


}