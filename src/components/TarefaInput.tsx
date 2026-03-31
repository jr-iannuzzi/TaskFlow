import { useState } from "react";
import type { Tarefa } from "../types/Tarefas";

interface Props {
  onAddTask: (titulo: string, prioridade: Tarefa["prioridade"]) => void;
}

export function TarefaInput({ onAddTask }: Props) {
  const [titulo, setTitulo] = useState("");
  const [prioridade, setPrioridade] = useState<Tarefa["prioridade"]>("media");

  function handleAdd() {
    if (!titulo.trim()) return;
    onAddTask(titulo.trim(), prioridade);
    setTitulo("");
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex gap-2">
        <input
          className="flex-1 p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 transition"
          placeholder="Nova tarefa..."
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 px-4 rounded hover:bg-blue-600 active:bg-blue-700 transition font-medium"
        >
          Adicionar
        </button>
      </div>

      <div className="flex gap-2 px-1">
        <span className="text-gray-400 text-xs self-center">Prioridade:</span>
        {(["baixa", "media", "alta"] as Tarefa["prioridade"][]).map((p) => {
          const labels = { baixa: "Baixa", media: "Média", alta: "Alta" };
          const colors = {
            baixa: "border-green-500/50 text-green-400 bg-green-500/10",
            media: "border-yellow-500/50 text-yellow-400 bg-yellow-500/10",
            alta: "border-red-500/50 text-red-400 bg-red-500/10",
          };
          const selected = prioridade === p;
          return (
            <button
              key={p}
              onClick={() => setPrioridade(p)}
              className={`text-xs px-3 py-1 rounded-full border transition ${
                selected
                  ? colors[p]
                  : "border-gray-700 text-gray-500 hover:border-gray-500"
              }`}
            >
              {labels[p]}
            </button>
          );
        })}
      </div>
    </div>
  );
}