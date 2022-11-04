import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";

export function NewCycleForm(){
    return (
        <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                    id="task"
                    list="task-suggestions"
                    placeholder="Dê um nome para o seu projeto"
                    {...register('task')}
                    disabled = {!!activeCycle}
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
                        min={1}
                        max={60}
                        {...register('minutesAmount', {valueAsNumber:true})} //try to remove valueAsNumber and see the options!
                        disabled = {!!activeCycle}
                    />

                    <span>minutos.</span>
                </FormContainer>
    )
}