import { useState } from 'react'
import {useEffect} from 'react'
import React from 'react'
// import { useState, useEffect } from 'react';
import { Plus, Check, X, Edit, Save } from 'lucide-react';
import Header from '../Component/Header.jsx';
import Footer from '../Component/Footer.jsx';
import { useNavigate } from 'react-router-dom';

const Todo = () => {
  const [list, setList] = useState([]);
  const [task, setTask] = useState("");
  const [editedTask, setEditedTask] = useState(null);
  const [editedText, setEditedText] = useState("");
  const navigate = useNavigate();

  const addTodo = () => {
    if (task.trim()) {
      setList([...list, {
        id: Date.now(), 
        text: task.trim(),
        completed: false
      }]);
      setTask("");
    }
  };

  const deleteTask = (id) => {
    setList(list.filter(task => task.id !== id));
  };

  const startEditing = (id, text) => {
    setEditedTask(id);
    setEditedText(text);
  };

  const saveEdit = (id) => {
    setList(list.map(task =>
      task.id === id ? { ...task, text: editedText.trim() } : task
    ));
    setEditedTask(null);
    setEditedText("");
  };

  const cancelEdit = () => {
    setEditedTask(null);
    setEditedText("");
  };

  const toggleComplete = (id) => {
    setList(list.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  useEffect(() => {
    const savedTodo = localStorage.getItem('Todos');
    const defaultTodo = [
      { id: 0, text: "manger", completed: true },
      { id: 1, text: "apprendre react", completed: false },
      { id: 2, text: "créer une todo list", completed: false }
    ];

    if (savedTodo) {
      try {
        const parsedTodos = JSON.parse(savedTodo);
        setList(parsedTodos);
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
        setList(defaultTodo);
      }
    } else {
      setList(defaultTodo);
    }
  }, []);

  useEffect(() => {
      if(list.length > 0){
        console.log("Sauvegarde des donnees", list);
        localStorage.setItem('Todos', JSON.stringify(list)); // stocker les donnees depuis React dans le localStorage du navigateur
        console.log("Donnees sauvegarder avec succes");
      }
  }, [list]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow p-4 md:p-8 flex justify-center item-start">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 mt-4">
          <h1 className="text-3xl font-bold text-blue-800 mb-6">Ma TodoList</h1>
          <div className="flex mb-6">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Ajouter une tâche..."
              className="flex-grow py-2 px-4 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-r-md flex items-center"
              onClick={addTodo}
            >
              <Plus size={20} />
            </button>
          </div>

          <h2 className="text-2xl mb-4 text-gray-700">Liste des tâches</h2>

          {list.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p className="mb-2">Votre liste est vide</p>
              <p>Ajoutez une tâche pour commencer</p>
            </div>
          ) : (
            <div className="space-y-3">
              {list.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <Check
                      size={18}
                      onClick={() => toggleComplete(task.id)}
                      className="cursor-pointer text-green-500 bg-tranparent hover:bg-red-600"
                    />
                    {editedTask === task.id ? (
                      <input
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className="border p-2 bg-indigo-100 rounded"
                      />
                    ) : (
                      <p
                        onClick={() => navigate(`/detail/${task.id}`)}
                        className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
                      >
                        {task.text}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {editedTask === task.id ? (
                      <>
                        <Save
                          size={18}
                          className="cursor-pointer text-green-500"
                          onClick={() => saveEdit(task.id)}
                        />
                        <X
                          size={18}
                          className="cursor-pointer text-red-500"
                          onClick={cancelEdit}
                        />
                      </>
                    ) : (
                      <>
                        <Edit
                          size={18}
                          className="cursor-pointer text-blue-500"
                          onClick={() => startEditing(task.id, task.text)}
                        />
                        <X
                          size={18}
                          className="cursor-pointer text-red-500"
                          onClick={() => deleteTask(task.id)}
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between text-sm text-gray-600 px-4 py-3 border-t mt-6">
            <span>{list.filter(t => !t.completed).length} restantes</span>
            <span>{list.filter(t => t.completed).length} terminées</span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Todo;
