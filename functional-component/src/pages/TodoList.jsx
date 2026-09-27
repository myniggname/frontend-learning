import React, { use } from 'react';
import { Task } from '@/models/Task.js';
import { StatWidget } from '@/components/StatWidget';
import { SegmentedControl } from '@/components/SegmentedControl';
import { StatWidgetVariant, CategoryStatus } from '@/constants/task.js';
import { inputControl } from '@/pages/TodoList/components/InputControl';
import { TaskItem } from '@/pages/TodoList/components/TaskItem';
import { Panel } from '@/components/Panel';
import { useCallback, useState, useMemo } from 'react';
import { InputControl } from './TodoList/components/InputControl';

const ALL_STATUSES = [
  { value: CategoryStatus.ALL, label: 'All' },
  { value: CategoryStatus.ACTIVE, label: 'Active' },
  { value: CategoryStatus.COMPLETED, label: 'Success' },
]

export function TodoList() {
  const [tasks, setTasks] = useState([
    new Task('Implementasi halaman register', false),
    new Task('Build halaman dashboard', false),
    new Task('Komponen To-Do List (Add, Edit, Delete Task)', true)
  ]);
  const [selectedCategorySegmentStatus, setSelectedCategorySegmentStatus] =
    useState(CategoryStatus.ALL);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const { allTasks, activeTasks, completedTasks, visibleTasks } =
    useMemo(() => {
      return tasks.reduce(
        (result, task) => {
          result.allTasks++;

          if (!task.completed) {
            result.activeTasks++;
          } else {
            result.completedTasks++;
          }

          switch (selectedCategorySegmentStatus) {
            case CategoryStatus.ACTIVE:
              if (!task.completed) result.visibleTasks.push(task);
              break;

            case CategoryStatus.COMPLETED:
              if (task.completed) result.visibleTasks.push(task);
              break;

            case CategoryStatus.ALL:
              result.visibleTasks.push(task);
              break;
          }

          return result;
        },

        {
          allTasks: 0,
          activeTasks: 0,
          completedTasks: 0,
          visibleTasks: [],
        },
      );
    }, [tasks, selectedCategorySegmentStatus]);

  const handleSelectSegmentOnStatusSegmentedControl = useCallback((value) => {
    setSelectedCategorySegmentStatus(value);
  });

  const handleAddOnInputControl = useCallback((taskName) => {
    const newTask = new Task(taskName, false);

    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, []);

  const handleClickCheckBoxOnTaskItem = useCallback((taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => 
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
            }
          : task,
      ),
    );
  }, []);

  const handleUpdateTask = useCallback((taskId, newName) => {
    setTasks((prevTasks) => 
      prevTasks.map((task) => 
        task.id === taskId
          ? {
              ...task,
              name: newName,
            }
          : task,
      ),
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
          label={'All'}
          value={allTasks}
          variant={StatWidgetVariant.LEAD}
        />
        <StatWidget 
          label={'Active'}
          value={allTasks}
          variant={StatWidgetVariant.INFO}
        />
        <StatWidget 
          label={'Completed'}
          value={allTasks}
          variant={StatWidgetVariant.SUCCESS}
        />
      </div>
      <div className="mb-2.5 px-4.5 py-2">
        <InputControl onAddTask={handleAddOnInputControl}/>
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
                  onStartEditTask={handleStartEditTask}
                />
              ))}
            </ul>
          </Panel.Body>
        </Panel>
      </div>
    </main>
  )
} 