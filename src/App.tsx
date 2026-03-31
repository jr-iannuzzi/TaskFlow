import { useState, useEffect } from "react";
import type { Tarefa } from "./types/Tarefas";
import { TarefaInput } from "./components/TarefaInput";

export default function App() {
  const [tasks, setTasks] = useState<Tarefa[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(titulo: string, prioridade: Tarefa["prioridade"]) {
    const newTask: Tarefa = {
      id: crypto.randomUUID(),
      titulo,
      completa: false,
      prioridade,
    };
    setTasks((prev) => [...prev, newTask]);
  }

  function toggleTask(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completa: !t.completa } : t))
    );
  }

  function removeTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  const prioridadeConfig = {
    alta: { label: "Alta", className: "bg-red-500/20 text-red-400 border border-red-500/30" },
    media: { label: "Média", className: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" },
    baixa: { label: "Baixa", className: "bg-green-500/20 text-green-400 border border-green-500/30" },
  };

  const pendentes = tasks.filter((t) => !t.completa).length;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800 p-6">
        <h1 className="text-3xl font-bold text-center">TaskFlow 🚀</h1>
        {tasks.length > 0 && (
          <p className="text-center text-gray-400 mt-1 text-sm">
            {pendentes === 0
              ? "Todas as tarefas concluídas! 🎉"
              : `${pendentes} tarefa${pendentes > 1 ? "s" : ""} pendente${pendentes > 1 ? "s" : ""}`}
          </p>
        )}
      </header>

      <main className="max-w-xl mx-auto p-4">
        <TarefaInput onAddTask={addTask} />

        {tasks.length === 0 ? (
          <div className="text-center text-gray-500 mt-16">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-lg font-medium">Nenhuma tarefa ainda.</p>
            <p className="text-sm mt-1">Adicione uma acima para começar!</p>
          </div>
        ) : (
          <ul className="mt-2 flex flex-col gap-2">
            {tasks.map((tarefa) => {
              const prio = prioridadeConfig[tarefa.prioridade];
              return (
                <li
                  key={tarefa.id}
                  className="bg-gray-800 p-3 rounded-lg flex items-center justify-between gap-3 group"
                >
                  <button
                    onClick={() => toggleTask(tarefa.id)}
                    aria-label={tarefa.completa ? "Marcar como pendente" : "Marcar como concluída"}
                    className="text-xl flex-shrink-0 cursor-pointer hover:scale-110 transition-transform"
                  >
                    {tarefa.completa ? "✅" : "⬜"}
                  </button>

                  <span
                    className={`flex-1 text-sm ${
                      tarefa.completa ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {tarefa.titulo}
                  </span>

                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${prio.className}`}>
                    {prio.label}
                  </span>

                  <button
                    onClick={() => removeTask(tarefa.id)}
                    aria-label="Remover tarefa"
                    className="text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 text-sm"
                  >
                    🗑️
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}