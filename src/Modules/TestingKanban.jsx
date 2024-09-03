import React, { useEffect, useState } from "react";
import Plus from "../Pages/small_icons/plus";
import Trash from "../Pages/small_icons/Trash";
import { post, get, remove, put } from "../services/ApiEndpoint";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { DndContext } from '@dnd-kit/core';
import useCustomDraggable from './useDraggable';
import useCustomDroppable from './useDroppable';

const TestingKanban = ({ boardId }) => {
  const [columns, setColumns] = useState([]);
  const [columnName, setColumnName] = useState("");
  const [editingColumn, setEditingColumn] = useState(null);
  const [editingColumnName, setEditingColumnName] = useState("");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [showNewItemInput, setShowNewItemInput] = useState(null);

  const userId = useSelector(state => state.auth._id);

  const DroppableColumn = ({ column, children }) => {
    const { setNodeRef, style } = useCustomDroppable(column);

    return (
      <div ref={setNodeRef} style={style} className="pt-5 flex flex-col h-auto w-[250px] min-w-[250px] bg-gray-800 text-white items-center border-2">
        <div className="flex justify-between items-center w-full py-1 text-xl bg-black">
          {editingColumn === column._id ? (
            <input
              type="text"
              value={editingColumnName}
              onChange={e => setEditingColumnName(e.target.value)}
              onBlur={() => handleUpdate(column._id)}
              onKeyDown={e => {
                if (e.key === "Enter") handleUpdate(column._id);
                if (e.key === "Escape") setEditingColumn(null);
              }}
              className="text-black w-full"
              autoFocus
            />
          ) : (
            <div className="flex justify-between px-4 items-center w-full">
              <div className="text-white cursor-pointer" onClick={() => handleClick(column)}>
                {column.columnName}
              </div>
              <button onClick={() => deleteColumn(column._id)} className="text-white hover:text-red-700">
                <Trash />
              </button>
            </div>
          )}
        </div>
        <div className="p-2 w-full h-full overflow-y-auto">{children}</div>
        {showNewItemInput === column._id ? (
          <form onSubmit={(e) => {
            e.preventDefault();
            addItem(column._id);
          }} className="flex flex-row mt-2 pb-5">
            <input
              type="text"
              value={newItem}
              onChange={e => setNewItem(e.target.value)}
              placeholder="Add Item"
              className="text-white px-2 h-[30px] w-[180px] min-w-[180px] bg-slate-800"
              autoFocus
            />
            <button type="submit" className="text-black px-2 justify-around items-center h-[30px] w-[30px] min-w-[30px] cursor-pointer bg-slate-800">
              <Plus />
            </button>
          </form>
        ) : (
          <button
            onClick={() => setShowNewItemInput(column._id)}
            className="text-white pb-2 px-2 flex justify-around items-center h-[30px] w-[180px] min-w-[180px] cursor-pointer bg-slate-800 mt-2"
          >
            Add an Item <Plus />
          </button>
        )}
      </div>
    );
  };

  const fetchColumns = async () => {
    try {
      const response = await get(`/board/columns?boardId=${boardId}`);
      if (response.status === 200 && Array.isArray(response.data)) {
        setColumns(response.data);
      } else {
        toast.error("Failed to fetch columns");
      }
    } catch (error) {
      console.error("Error fetching columns:", error);
      toast.error("Error fetching columns");
    }
  };

  

  const fetchItems = async () => {
    try {
      const response = await get(`/board/items?boardId=${boardId}`);
      if (response.status === 200 && Array.isArray(response.data)) {
        setItems(response.data);
      } else {
        toast.error("Failed to fetch items");
      }
    } catch (error) {
      console.error("Error fetching items:", error);
      toast.error("Error fetching items");
    }
  };

  useEffect(() => {
    fetchColumns();
    fetchItems();
  }, [userId, boardId]);

  const addColumn = async () => {
    if (!columnName) {
      toast.error("Please enter column name");
      return;
    }
    try {
      const response = await post("/board/columns", { columnName, boardId, userId });
      if (response.status === 201) {
        fetchColumns();
        fetchItems();
        setColumnName("");
        toast.success("Column added successfully");
      } else {
        toast.error("Failed to add column");
      }
    } catch (error) {
      console.error("Error adding column:", error);
      toast.error("Failed to add column");
    }
  };

  const updateColumn = async (columnId, newColumnName) => {
    try {
      const response = await put(`/board/columns/${columnId}`, { columnName: newColumnName });
      if (response.status === 200) {
        fetchColumns();
        toast.success("Column updated successfully");
      } else {
        toast.error("Failed to update column");
      }
    } catch (error) {
      console.error("Error updating column:", error);
      toast.error("Failed to update column");
    } finally {
      setEditingColumn(null);
      setEditingColumnName("");
    }
  };

  const deleteColumn = async (columnId) => {
    try {
      const response = await remove(`/board/columns/${columnId}`);
      if (response.status === 200) {
        deleteItemsInColumn(columnId);
        fetchColumns();
        fetchItems();
        toast.success("Column deleted successfully");
      } else {
        toast.error("Failed to delete column");
      }
    } catch (error) {
      console.error("Error deleting column:", error);
      toast.error("Failed to delete column");
    }
  };

  const handleClick = column => {
    setEditingColumn(column._id);
    setEditingColumnName(column.columnName);
  };

  const handleUpdate = columnId => {
    if (editingColumnName.trim()) {
      updateColumn(columnId, editingColumnName);
    } else {
      toast.error("Column name cannot be empty");
    }
  };

  const addItem = async (columnId) => {
    if (!newItem) {
      toast.error("Please enter item description");
      return;
    }
    try {
      const response = await post("/board/items", { descriptions: newItem, columnsId: columnId });
      if (response.status === 201) {
        setNewItem("");
        setShowNewItemInput(null);
        fetchItems();
        toast.success("Item added successfully");
      } else {
        toast.error("Failed to add item");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Failed to add item");
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const response = await remove(`/board/items/${itemId}`);
      if (response.status === 200) {
        fetchItems();
        toast.success("Item deleted successfully");
      } else {
        toast.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item");
    }
  };

  const deleteItemsInColumn = async (columnId) => {
    try {
      const response = await remove(`/board/items?columnId=${columnId}`);
      if (response.status === 200) {
        fetchItems();
        toast.success("Items deleted successfully");
      } else {
        toast.error("Failed to delete items");
      }
    } catch (error) {
      console.error("Error deleting items:", error);
      toast.error("Failed to delete items");
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    fetchItems()
    if (over) {
      const sourceColumnId = active.data.current.columnId;
      const targetColumnId = over.data.current.columnId;

      if (sourceColumnId !== targetColumnId) {
        moveItem(active.id, targetColumnId);
        fetchItems()
      }
    }
  };

  const moveItem = async (itemId, targetColumnId) => {
    try {
      const response = await put(`/board/items/${itemId}`, { columnsId: targetColumnId });
      if (response.status === 200) {
        fetchItems();
        fetchColumns();
        toast.success("Item moved successfully");
      } else {
        toast.error("Failed to move item");
      }
    } catch (error) {
      console.error("Error moving item:", error);
      toast.error("Failed to move item");
    }
  };

  const DraggableItem = ({ item }) => {
    const { attributes, listeners, setNodeRef, style } = useCustomDraggable(item);

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="flex h-10 w-full bg-gray-700 pl-2 text-white justify-between items-center border-2 my-1"
      >
        {item.descriptions}
        <button onClick={() => deleteItem(item._id)} className="text-white hover:text-red-700">
          <Trash />
        </button>
      </div>
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex w-full overflow-x-auto max-h-screen  mt-5">
        <div className="flex flex-row rounded-xl space-x-2">
          {Array.isArray(columns) &&
            columns
              .filter(col => col.boardId === boardId)
              .map((col) => (
                <DroppableColumn key={col._id} column={col}>
                  {items
                    .filter(item => item.columnsId === col._id)
                    .map((itm) => (
                      <DraggableItem key={itm._id} item={itm} />
                    ))}
                </DroppableColumn>
              ))}
          <div className="flex flex-row">
            <input
              type="text"
              value={columnName}
              onChange={e => setColumnName(e.target.value)}
              placeholder="Add Column"
              className="text-white px-2 items-center h-[50px] w-[200px] min-w-[200px] bg-slate-800"
            />
            <button
              onClick={addColumn}
              className="text-white px-2 justify-around items-center h-[50px] w-[50px] min-w-[50px] cursor-pointer bg-slate-800"
            >
              <Plus />
            </button>
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default TestingKanban;
