import { useDraggable } from '@dnd-kit/core';

const useCustomDraggable = (item) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item._id,
    data: { columnId: item.columnsId },
  });

  // Apply styles based on dragging state
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${isDragging ? '10deg' : '0deg'})`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    transition: 'transform 250ms ease, opacity 250ms ease',
  };

  return { attributes, listeners, setNodeRef, style };
};

export default useCustomDraggable;
