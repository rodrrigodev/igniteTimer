import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";
import { Play } from "phosphor-react";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa!'),
    minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})


// interface NewCycleFormData{
//     task: string
//     minutesAmount: number
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> //both forms are correct

interface Cycle{
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date
}

export function Home() {

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const { register, handleSubmit, watch, formState, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues:{
            task: "",
            minutesAmount: 0
        }
    })

    const activeCycle = cycles.find((cycle)=> cycle.id === activeCycleId)

    useEffect(()=> { 
        let interval: number;
        if(activeCycle){
            interval = setInterval(()=> {
                setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startDate))
            }, 1000)
        }

        return ()=>{
            clearInterval(interval)
        }

     }, [activeCycle])

    function handleCreateNewCycle(data:NewCycleFormData){
        const id = String(new Date().getTime())
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        setCycles((state)=> [...cycles, newCycle])
        setActiveCycleId(newCycle.id)
        setAmountSecondsPassed(0)
        reset()
    }
    // console.log(formState.errors)


    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0 

    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, "0")
    const seconds = String(secondsAmount).padStart(2, "0")

    useEffect(()=> {
        if(activeCycle){document.title = `${minutes}:${seconds}`
}}, [minutes, seconds])

    const task = watch('task') //watch is similiar a onchange function
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                    id="task"
                    list="task-suggestions"
                    placeholder="Dê um nome para o seu projeto"
                    {...register('task')}
                    />

                    <datalist id="task-suggestions">
                        <option value="Projeto 1"/>
                        <option value="Projeto 2"/>
                        <option value="Projeto 3"/>
                        <option value="Manga"/>
                    </datalist>

                    <label htmlFor="minutesAmout">Durante</label>
                    <MinutesAmountInput
                        type="number"
                        id="minutesAmout"
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                        {...register('minutesAmount', {valueAsNumber:true})} //try to remove valueAsNumber and see the options!
                    />

                    <span>minutos.</span>
                </FormContainer>

                <CountdownContainer>
                    <span>{minutes[0]}</span>
                    <span>{minutes[1]}</span>
                    <Separator>:</Separator>
                    <span>{seconds[0]}</span>
                    <span>{seconds[1]}</span>
                </CountdownContainer>

                <StartCountDownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} /> Começar
                </StartCountDownButton>
            </form>
        </HomeContainer>
    )
}