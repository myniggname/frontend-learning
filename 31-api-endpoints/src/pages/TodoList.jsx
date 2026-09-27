import { Panel } from '@/components/Panel';
import { SegmentedControl } from '@/components/SegmentedControl';
import { StatWidget } from '@/components/StatWidget';
import { CategoryStatus, StatWidgetVariants } from '@/constants/task.js';
import { Task } from '@/models/Task.js';
import { InputControl } from '@/pages/TodoList/components/InputControl';
import { TaskItem } from '@/pages/TodoList/components/TaskItem';
import { useCallback, useMemo, useState } from 'react';

const STATUSES = [
  { value: CategoryStatus.ALL, label: 'All' },
  { value: CategoryStatus.ACTIVE, label: 'Active' },
  { value: CategoryStatus.COMPLETED, label: 'Success' },
];

export function TodoList() {
  const [tasks, setTasks] = useState([
    new Task('Implementasi halaman register', false),
    new Task('Build halaman dashboard', false),
    new Task('Komponen To-Do List (Add, Edit, Delete Task)', true),
  ]);
  const [selectedCategorySegmentStatus, setSelectedCategorySegmentStatus] =
    useState(CategoryStatus.ALL);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const { allTasks, activeTasks, completedTasks, visibleTasks } =
    useMemo(() => {
      const activeTasksCount = tasks.filter((task) => !task.completed).length;
      const completedTasksCount = tasks.filter((task) => task.completed).length;

      const filtered = tasks.filter((task) => {
        if (selectedCategorySegmentStatus === CategoryStatus.ACTIVE) {
          return !task.completed;
        }
        if (selectedCategorySegmentStatus === CategoryStatus.COMPLETED) {
          return task.completed;
        }
        return true; // CategoryStatus.ALL
      });

      return {
        allTasks: tasks.length,
        activeTasks: activeTasksCount,
        completedTasks: completedTasksCount,
        visibleTasks: filtered,
      };
    }, [tasks, selectedCategorySegmentStatus]);

  const handleSelectSegmentOnStatusSegmentedControl = useCallback((segment) => {
    const value =
      typeof segment === 'object' && segment !== null ? segment.value : segment;
    setSelectedCategorySegmentStatus(value);
  }, []);

  const handleAddOnInputControl = useCallback((taskName) => {
    const newTask = new Task(taskName, false);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, []);

  const handleClickCheckBoxOnTaskItem = useCallback((taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id !== taskId) return task;

        const updatedTask = Object.assign(
          Object.create(Object.getPrototypeOf(task)),
          task,
          { completed: !task.completed },
        );
        return updatedTask;
      }),
    );
  }, []);

  const handleUpdateTask = useCallback((taskId, newName) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id !== taskId) return task;

        const updatedTask = Object.assign(
          Object.create(Object.getPrototypeOf(task)),
          task,
          { name: newName },
        );
        return updatedTask;
      }),
    );
    setEditingTaskId(null);
  }, []);

  const handleStartEditingTask = useCallback((taskId) => {
    setEditingTaskId(taskId);
  }, []);

  const handleDeleteTask = useCallback((taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  return (
    <main className="bg-bg-primary mx-auto mt-[10vh] w-150 rounded-3xl">
      <h2 className="block p-4.5 text-[24px] font-semibold">TodoList</h2>
      <div className="mb-2.5 flex gap-1.5 px-4.5">
        <StatWidget
          label="All"
          value={allTasks}
          variant={StatWidgetVariants.LEAD}
        />
        <StatWidget
          label="Active"
          value={activeTasks}
          variant={StatWidgetVariants.INFO}
        />
        <StatWidget
          label="Completed"
          value={completedTasks}
          variant={StatWidgetVariants.SUCCESS}
        />
      </div>
      <div className="mb-2.5 px-4.5 py-2">
        <InputControl onAddTask={handleAddOnInputControl} />
      </div>
      <div className="px-2 pb-2">
        <Panel>
          <Panel.Header>
            <SegmentedControl
              segments={STATUSES}
              selectedSegment={selectedCategorySegmentStatus}
              onSelectSegment={handleSelectSegmentOnStatusSegmentedControl}
            />
          </Panel.Header>
          <Panel.Body>
            <ul className="m-0 flex flex-col gap-2.5">
              {visibleTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  isUpdating={task.id === editingTaskId}
                  onClickCheckBox={handleClickCheckBoxOnTaskItem}
                  onDeleteTask={handleDeleteTask}
                  onUpdateTask={handleUpdateTask}
                  onStartEditTask={handleStartEditingTask}
                />
              ))}
            </ul>
          </Panel.Body>
        </Panel>
      </div>
    </main>
  );
}
