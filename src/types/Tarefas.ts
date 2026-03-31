export type Prioridade = "baixa" | "media" | "alta";

export interface Tarefa {
  id: string;
  titulo: string;
  completa: boolean;
  prioridade: Prioridade;
  deadline?: string;
}