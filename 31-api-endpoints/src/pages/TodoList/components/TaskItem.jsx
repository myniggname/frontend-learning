import { CheckBox } from '@/components/CheckBox';
import { IconPenSquare, IconTrash } from '@/components/Icons';
import { useCallback, useState } from 'react';

/**
 * @typedef {Object} TaskItemProps
 * @property {import('@/models/Task').Task} task
 * @property {boolean} isUpdating
 * @property {(id: string) => void} onClickCheckBox
 * @property {(id: string) => void} onStartEditTask
 * @property {(id: string, name: string) => void} onUpdateTask
 * @property {(id: string) => void} onDeleteTask
 */

/**
 * @param {TaskItemProps} props
 */
export function TaskItem({
  task,
  isUpdating,
  onClickCheckBox,
  onStartEditTask,
  onUpdateTask,
  onDeleteTask,
}) {
  const [name, setName] = useState(task.name);

  const handleClickCheckBox = useCallback(() => {
    onClickCheckBox(task.id);
  }, [task.id, onClickCheckBox]);

  const handleClickEditButton = useCallback(() => {
    if (isUpdating) return;

    onStartEditTask(task.id);
  }, [task, isUpdating, onStartEditTask]);

  const handleChangeName = useCallback((event) => {
    setName(event.target.value);
  }, []);

  const handleSaveTask = useCallback(() => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      setName(task.name);
      return;
    }
    onUpdateTask(task.id, trimmedName);
  }, [task.id, task.name, name, onUpdateTask]);

  const handleKeyDownInput = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSaveTask();
      } else if (event.key === 'Escape') {
        setName(task.name);
        onUpdateTask(task.id, task.name);
      }
    },
    [handleSaveTask, task.name, task.id, onUpdateTask],
  );

  const handleClickDeleteButton = useCallback(() => {
    onDeleteTask(task.id);
  }, [task.id, onDeleteTask]);

  return (
    <li
      className={`group flex h-14 items-center gap-3 rounded-lg border border-neutral-100 px-4.5 transition-colors'$(
        task.completed ? 'bg-[#F9F9F9]' : 'bg-white',
      }`}
    >
      <div className="flex items-center justify-center shrink-0">
        <CheckBox isChecked={task.completed} onToggle={handleClickCheckBox} />
      </div>

      {isUpdating ? (
        <input
          className="flex-1 rounded border border-neutral-300 px-2 py-1 outline-none"
          value={name}
          onChange={handleChangeName}
          onKeyDown={handleKeyDownInput}
          onBlur={handleSaveTask}
          aria-label="Edit task name"
          autoFocus
        />
      ) : (
        <span
          role="button"
          tabIndex={0}
          aria-label={`Mark task as ${task.completed ? 'incomplete' : 'complete'}`}
          aria-checked={task.completed}
          className={`flex-1 cursor-pointer font-medium leading-[1.1875] select-none outline-none focus-visible:underline ${
            task.completed
              ? 'text-neutral-400 line-through'
              : 'text-neutral-900'
          }`}
          onClick={handleClickCheckBox}
          onKeyDown={(e) => e.key === 'Enter' && handleClickCheckBox()}
        >
          {task.name}
        </span>
      )}
      <div className="flex gap-3 opacity-0 group-hover:opacity-100">
        <button
          type="button"
          aria-label={isUpdating ? 'Save edit' : 'Edit task'}
          className="flex h-4 w-4 items-center justify-center border-none bg-transparent cursor-pointer"
          onClick={isUpdating ? handleSaveTask : handleClickEditButton}
        >
          <IconPenSquare color="#414141" className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Delete task"
          className="flex h-4 w-4 items-center justify-center border-none bg-transparent text-[#414141] hover:text-[#FF0000] cursor-pointer transition-colors"
          onClick={handleClickDeleteButton}
        >
          <IconTrash color="currentColor" className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
}
