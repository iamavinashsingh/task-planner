import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePlannerStore } from '../state/plannerStore';
import { useCreateTask, useTasks, useUpdateTask } from '../hooks/useTasks';
import { useEfficiency } from '../hooks/useEfficiency';
import { GlassCard } from '../components/ui/GlassCard';
import { NeoButton } from '../components/ui/NeoButton';
import { ProgressRing } from '../components/ui/ProgressRing';
import { Modal } from '../components/ui/Modal';
import { TaskCard } from '../components/tasks/TaskCard';
import { TaskForm } from '../components/tasks/TaskForm';
import { DEFAULT_SPRING } from '../lib/motion';

const views = ['DAILY', 'WEEKLY', 'MONTHLY'];

export function DashboardPage() {
  const { userId, view, activeDate, setView, setActiveDate } = usePlannerStore();
  const [isOpen, setIsOpen] = useState(false);

  const taskQuery = useMemo(() => ({ userId, view, date: activeDate }), [userId, view, activeDate]);
  const analyticsQuery = useMemo(
    () => ({ userId, timeframe: view.toLowerCase() }),
    [userId, view]
  );

  const tasksQuery = useTasks(taskQuery);
  const efficiencyQuery = useEfficiency(analyticsQuery);
  const createTaskMutation = useCreateTask(taskQuery);
  const updateTaskMutation = useUpdateTask(taskQuery);

  const tasks = tasksQuery.data?.tasks || [];
  const efficiency = efficiencyQuery.data?.efficiency || 0;

  const handleComplete = (task) => {
    updateTaskMutation.mutate({
      taskId: task._id,
      body: {
        userId,
        sourceView: view,
        status: 'COMPLETED'
      }
    });
  };

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 md:px-8">
      <header className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-text-primary">Daily Task Manager & Planner</h1>
          <p className="text-sm text-text-secondary">A premium planning workflow built for speed and clarity.</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            className="rounded-2xl border border-white/10 bg-bg-surface1 px-3 py-2 text-sm text-text-primary"
            type="date"
            value={activeDate}
            onChange={(event) => setActiveDate(event.target.value)}
          />
          <NeoButton className="bg-bg-surface1" onClick={() => setIsOpen(true)}>+ New Task</NeoButton>
        </div>
      </header>

      <section className="mb-6 grid gap-4 md:grid-cols-[1fr_auto]">
        <GlassCard className="flex flex-wrap gap-2">
          {views.map((item) => (
            <NeoButton key={item} pressed={item === view} className="bg-bg-surface1" onClick={() => setView(item)}>
              {item}
            </NeoButton>
          ))}
        </GlassCard>

        <GlassCard className="flex items-center justify-center">
          <ProgressRing value={efficiency} label={`${view} efficiency`} />
        </GlassCard>
      </section>

      <AnimatePresence mode="popLayout">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tasks.map((task) => (
            <motion.div key={task._id} layout transition={DEFAULT_SPRING}>
              <TaskCard task={task} onComplete={handleComplete} />
            </motion.div>
          ))}
        </section>
      </AnimatePresence>

      {tasks.length === 0 && !tasksQuery.isLoading && (
        <GlassCard className="mt-6 text-center text-text-secondary">No tasks found for this range.</GlassCard>
      )}

      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Create task">
        <TaskForm
          userId={userId}
          selectedDate={activeDate}
          loading={createTaskMutation.isPending}
          onSubmit={(payload) => {
            createTaskMutation.mutate(payload, {
              onSuccess: () => {
                setIsOpen(false);
              }
            });
          }}
        />
      </Modal>
    </main>
  );
}
