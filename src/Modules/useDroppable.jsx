import { useDroppable } from '@dnd-kit/core';

const useCustomDroppable = (column) => {
  const { setNodeRef ,isOver} = useDroppable({
    id: column._id,
    data: { columnId: column._id }
  });

  const style = {
    border: isOver ? '2px dashed #00f' : undefined,
  };

  return { setNodeRef,style};
};

export default useCustomDroppable;
