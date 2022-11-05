import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { createContext, useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";

interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interruptedDate?: Date,
    finishedDate?: Date
}

interface CyclesContextType {
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    markCurrentCycleAsFinished: ()=> void
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function markCurrentCycleAsFinished(){
        setCycles(state=> state.map((cycle)=>{
            if(cycle.id === activeCycleId){
                return { ...cycle, finishedDate: new Date() }
            }else{
                return cycle
            }
        }))
    }

    function handleCreateNewCycle(data: NewCycleFormData) {
        const id = String(new Date().getTime())
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        setCycles((state) => [...cycles, newCycle])
        setActiveCycleId(newCycle.id)
        setAmountSecondsPassed(0)
        reset()
    }
    // console.log(formState.errors)

    function handleInterruptCycle() {

        setCycles(state => state.map((cycle) => {
            if (cycle.id === activeCycleId) {
                return { ...cycle, interruptedDate: new Date() }
            } else {
                return cycle
            }
        }))

        setActiveCycleId(null)
    }


    const task = watch('task') //watch is similiar a onchange function
    const isSubmitDisabled = !task

    console.log(cycles)

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

                <CyclesContext.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished}}>
                    <NewCycleForm />
                    <Countdown />
                </CyclesContext.Provider>

                {activeCycle ? (
                    <StopCountDownButton onClick={handleInterruptCycle} type="button">
                        <HandPalm size={24} /> Interromper
                    </StopCountDownButton>
                ) : (
                    <StartCountDownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24} /> Começar
                    </StartCountDownButton>
                )}
            </form>
        </HomeContainer>
    )
}