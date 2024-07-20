import React, { useState, useRef, useEffect } from 'react';
import { post, put } from '../services/ApiEndpoint';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import 'react-toastify/dist/ReactToastify.css';

const KanbanBoard = () => {
  const [columns, setColumns] = useState([]);
  const [newColumnName, setNewColumnName] = useState('');
  const [newItem, setNewItem] = useState({});
  const [loading, setLoading] = useState(false);

  const  id  = useParams();
  const user = useSelector((state) => state.Auth);
  const columnsRef = useRef(columns);
  const Allow = () =>{
    if(id){
      return true;
    }
    else{
      toast.error('Please login to access this page');
      return false;
    }
  }
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  useEffect(() => {
    const savedColumns = localStorage.getItem('kanbanColumns');
    if (savedColumns) {
      setColumns(JSON.parse(savedColumns));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('kanbanColumns', JSON.stringify(columns));
  }, [columns]);

  const addColumn = () => {
    if (!newColumnName) {
      toast.error('Column name cannot be empty');
      return;
    }

    const updatedColumns = [...columnsRef.current, { name: newColumnName, items: [] }];
    setColumns(updatedColumns);
    columnsRef.current = updatedColumns;
    setNewColumnName('');
  };

  const addItem = async (columnIndex) => {
    if (!newItem[columnIndex]) {
      toast.error('Item cannot be empty');
      return;
    }

    setLoading(true);

    try {
      const response = await post('/items/items', {
        descriptionName: columnsRef.current[columnIndex].name,
        description: newItem[columnIndex],
        userId: user._id
      });

      if (response.status === 400) {
        toast.error(response.data.message);
        return; 
      }

      const updatedColumns = [...columnsRef.current];
      updatedColumns[columnIndex].items.push(response.data);
      setColumns(updatedColumns);
      columnsRef.current = updatedColumns;
      setNewItem({ ...newItem, [columnIndex]: '' });
      toast.success('Item added successfully');
    } catch (error) {
      toast.error('Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  const onDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const [activeColumnIndex, activeIndex] = active.id.split('-').map(Number);
    const [overColumnIndex, overIndex] = over.id.split('-').map(Number);

    if (activeColumnIndex === overColumnIndex && activeIndex === overIndex) return;

    const sourceColumn = columns[activeColumnIndex];
    const destColumn = columns[overColumnIndex];

    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];

    const [movedItem] = sourceItems.splice(activeIndex, 1);
    destItems.splice(overIndex, 0, movedItem);

    const updatedColumns = [...columns];
    updatedColumns[activeColumnIndex] = { ...sourceColumn, items: sourceItems };
    updatedColumns[overColumnIndex] = { ...destColumn, items: destItems };

    setColumns(updatedColumns);
    columnsRef.current = updatedColumns;

    try {
      await put('/items/items', {
        itemId: movedItem._id,
        newColumnId: destColumn.id,
        newIndex: overIndex
      });

      toast.success('Item moved successfully');
    } catch (error) {
      toast.error('Failed to move item');
    }
  };

  return (
    <div className="flex flex-row items-start space-x-4 space-y-2">
      <ToastContainer />
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <div className="flex justify-center items-center space-x-4">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="w-64 p-2 bg-gray-200 rounded-3xl shadow">
              <h2 className="mb-4 text-xl flex items-center justify-center rounded-2xl font-bold">{column.name}</h2>
              <SortableContext
                items={column.items.map((_, index) => `${columnIndex}-${index}`)}
                strategy={verticalListSortingStrategy}
              >
                {column.items.map((item, index) => (
                  <SortableItem key={item._id} id={`${columnIndex}-${index}`} item={item} />
                ))}
              </SortableContext>
              <input
                type="text"
                value={newItem[columnIndex] || ''}
                onChange={(e) => setNewItem({ ...newItem, [columnIndex]: e.target.value })}
                className="w-full px-3 py-2 border rounded-3xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter a new item"
              />
              <button
                onClick={() => addItem(columnIndex)}
                disabled={loading}
                className={`w-full px-4 py-2 font-medium text-white bg-gray-500 rounded-3xl hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 ${loading && 'opacity-50'}`}
              >
                {loading ? 'Adding...' : 'Add'}
              </button>
            </div>
          ))}
        </div>
      </DndContext>
      <div className="w-56 p-2 space-y-2 bg-gray-200 rounded-3xl shadow">
        <input
          type="text"
          value={newColumnName}
          onChange={(e) => setNewColumnName(e.target.value)}
          className="w-full px-3 py-2 border rounded-3xl focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter a new column name"
        />
        <button
          onClick={addColumn}
          className="w-full px-4 py-2 font-medium text-white bg-green-600 rounded-3xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add Column
        </button>
      </div>
    </div>
  );
};

const SortableItem = ({ id, item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="p-2 bg-white rounded-3xl shadow">
      {item.description}
    </div>
  );
};

export default KanbanBoard;
