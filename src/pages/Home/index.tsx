import { HandPalm, Play } from "phosphor-react";
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import * as zod from 'zod'
import { useContext } from "react";
import { CyclesContext } from "../../contexts/CycleContext";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa!'),
    minutesAmount: zod
        .number()
        .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema> //both forms are correct

export function Home() {

    const { createNewCycle, interruptCurrentCycle, activeCycle } = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0
        }
    })

const { handleSubmit, watch, formState, /*reset*/ } = newCycleForm


    const task = watch('task') //watch is similiar a onchange function
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(createNewCycle)} action="">

                    <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                    </FormProvider>
                    <Countdown />

                {activeCycle ? (
                    <StopCountDownButton onClick={interruptCurrentCycle} type="button">
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