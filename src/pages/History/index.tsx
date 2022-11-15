import { useContext } from "react";
import { CyclesContext } from "../../contexts/CycleContext";
import { HistoryContainer, HistoryList, Status } from "./styles";

export function History(){

    const {cycles} = useContext(CyclesContext)
    return(
        <HistoryContainer>
            <h1>Meu Histórico</h1>

        <pre>
            {JSON.stringify(cycles, null, 2)}
        </pre>

            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <Status statusColor="green">Concluído</Status>
                        </tr>

                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <Status statusColor="yellow">Concluído</Status>
                        </tr>

                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <Status statusColor="red">Concluído</Status>
                        </tr>

                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <Status statusColor="red">Concluído</Status>
                        </tr>

                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <Status statusColor="green">Concluído</Status>
                        </tr>

                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há cerca de 2 meses</td>
                            <Status statusColor="yellow">Concluído</Status>
                        </tr>
                    <tbody>

                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    )
}