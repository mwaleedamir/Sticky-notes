import React, { useEffect, useState } from "react";
import Plus from "../Pages/small_icons/plus";
import Trash from "../Pages/small_icons/Trash";
import { post, get, remove, put } from "../services/ApiEndpoint";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {useDispatch} from 'react-redux'
import { setColumn } from "../redux/ColumnSlice";

const TestingKanban = () => {
  const [columns, setColumns] = useState([]);
  const [columnName, setColumnName] = useState("");
  const [editingColumn, setEditingColumn] = useState(null);
  const [editingColumnName, setEditingColumnName] = useState("");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [showNewItemInput, setShowNewItemInput] = useState(null);

  const userId = useSelector(state => state.auth._id);
  const boardId = useSelector(state => state.board);
  console.log('board Id up check' ,boardId)
  const dispatch = useDispatch()

  const fetchColumns = async () => {
    try {
      const response = await get("/board/columns");
      console.log("fetchColumns", response)
      if (response.status === 200 && Array.isArray(response.data)) {
        setColumns(response.data);
        console.log("Board Id",boardId)
        dispatch(setColumn(response.data.column))
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
      const response = await get("/board/items");
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
      const response = await post("/board/columns", { columnName ,userId});
      if (response.status === 201) {
        setColumns(response.data);
        toast.success("Column added successfully");
        setColumnName("");
        fetchColumns()
        fetchItems()
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
      const response = await put(`/board/columns/${columnId}`, {
        columnName: newColumnName
      });
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
        DeleteItems()
        fetchItems();
        fetchColumns();
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

  const addItem = async columnsId => {
    if (!newItem) {
      toast.error("Please enter item description");
      return;
    }
    try {
      const response = await post("/board/items", {
        descriptions: newItem,
        columnsId
      });
      if (response.status === 201) {
        toast.success("Item added successfully");
        setNewItem("");
        setShowNewItemInput(null);
        fetchItems();
      } else {
        toast.error("Failed to add item");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Failed to add item");
    }
  };

  const DeleteItems = async(itemsId) => {
    try {
      const response = await remove(`/board/items/${itemsId}`);
      if (response.status === 200) {
        toast.success("Item deleted successfully");
        fetchItems();
      } else {
        toast.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete item");
    }
  };

  return (
    <div className="flex w-full py-3 overflow-x-auto overflow-y-hidden mt-5">
      <div className="flex flex-row space-x-2">
        {Array.isArray(columns) &&
          columns.filter(col => col.userId === userId).map((col, index) => (
            <div
              key={index}   
              className="pt-5 flex flex-col h-auto w-[250px] min-w-[250px] bg-gray-800 text-white items-center border-2"
            >
              <div className="flex justify-between items-center w-full py-1 text-xl bg-black">
                {editingColumn === col._id ? (
                  <input
                    type="text"
                    value={editingColumnName}
                    onChange={e => setEditingColumnName(e.target.value)}
                    onBlur={() => handleUpdate(col._id)}
                    onKeyDown={e =>
                      e.key === "Enter" && handleUpdate(col._id)
                    }
                    className="text-black w-full"
                    autoFocus
                  />
                ) : (
                  <div className="flex justify-between px-4 items-center w-full">
                    <div
                      className="text-white"
                      onClick={() => handleClick(col)}
                    >
                      {col.columnName}
                    </div>
                    <button
                      onClick={() => deleteColumn(col._id)}
                      className="text-white hover:text-red-700"
                    >
                      <Trash />
                    </button>
                  </div>
                )}
              </div>

              <div className="p-2 w-full overflow-auto">
                {Array.isArray(items) &&
                  items
                    .filter(item => item.columnsId === col._id)
                    .map((itm, index) => (
                      <div
                        key={index}
                        className="flex flex-row items-center"
                      >
                        <div
                          className="flex h-10 w-full bg-gray-700 pl-2 text-white justify-between items-center border-2 my-1"
                        >
                          {itm.descriptions}
                        <button
                          onClick={() => DeleteItems(itm._id)}
                          className="text-white hover:text-red-700"
                        >
                          <Trash />
                        </button>
                        </div>
                      </div>
                    ))}
              </div>

              {showNewItemInput === col._id ? (
                <div className="flex flex-row mt-2 pb-5">
                  <input
                    type="text"
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    placeholder="Add Item"
                    className="text-black px-2 h-[30px] w-[180px] min-w-[180px] bg-white"
                  />
                  <button
                    onClick={() => addItem(col._id)}
                    className="text-black px-2 justify-around items-center h-[30px] w-[30px] min-w-[30px] cursor-pointer bg-white"
                  >
                    <Plus />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowNewItemInput(col._id)}
                  className="text-white px-2 flex justify-around items-center h-[30px] w-[180px] min-w-[180px] cursor-pointer bg-slate-800 mt-2"
                >
                  Add an Item <Plus />
                </button>
              )}
            </div>
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
  );
};

export default TestingKanban;
