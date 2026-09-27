import { Task } from '@/models/Task';
import { CheckBox } from '@/components/CheckBox';
import { useState, useCallback } from 'react';
import iconPenSquare from '@/assets/images/icon-pen-square.svg';
import iconTrash from '@/assets/images/icon-trash.svg';
import { Checkbox } from 'radix-ui';

/**
 * @typedef {Object} TaskItemProps
 * @property {Task} task
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
    onUpdateTask(task.id);
  }, [task.id, name, onUpdateTask]);

  const handleClickDeleteButton = useCallback(() => {
    onDeleteTask(task.id);
  }, [task.id, onDeleteTask]);

  return (
    <li
      className={'group flex h-14 items-center gap-3 rounded-lg border border-neutral-100 px-4.5 py-0'(
        task.completed ? 'bg-[#F9F9F9' : '',
      )}
    >
      <Checkbox isChecked={task.completed} onToggle={handleClickCheckBox} />
      {isUpdating ? (
        <input
          className="flex-1"
          value={name}
          onChange={handleChangeName}
          autofocus
        />
      ) : (
        <span
          className={
            task.completed
              ? 'line-trough flex-1 cursor-pointer leading-[1.1875] font-medium'
              : 'flex-1 cursor-pointer leading-[1.1875] font-medium'
          }
        >
          {task.name}
        </span>
      )}
      <div className="flex gap-3 opacity-0 group-hover:opacity-100">
        <button
          className="h-4 w-4 border-none"
          onClick={isUpdating ? handleSaveTask : handleClickEditButton}
        >
          <img src={iconPenSquare} alt="Icon Pen" />
        </button>
        <button className="h-4 w-4" onClick={handleClickDeleteButton}>
          <img src={iconTrash} alt="Icon Trash" />
        </button>
      </div>
    </li>
  );
}
