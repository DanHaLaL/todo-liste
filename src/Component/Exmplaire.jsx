
import { useState } from 'react'
import React from 'react'
import {Plus,Check,X,Edit,Save} from 'lucide-react'
import Header from '../Component/Header.jsx'
import Footer from '../Component/Footer.jsx'
import {useEffect} from "react"
import {useNavigate} from "react-router-dom"


const Todo = () => {
    const [list, setList] = useState([])
    const [task, setTask] = useState("")
    const addTodo = () => {
        if(task.trim()){
            setList([...list, {
                id:Date.now(),
                text:task.trim(),
                completed:false,
            }])
            setTask("");
        }
    }
    const navigate = useNavigate();
       // Fonction pour supprimer une tâche
    const deleteTask = (id) => {
         setList(list.filter(task => task.id !== id));
    };

      // Fonction pour démarrer l'édition d'une tâche
   const [editedTask, setEditingTask] = useState(null); // ID de la tâche en cours d'édition
   const [editedText, setEditedText] = useState("");   // Texte édité

   const startEditing = (id, text) => {
     setEditingTask(id);
     setEditedText(text);
   };

    // Fonction pour sauvegarder les modifications
   const saveEdit = (id) => {
     setList(list.map(task =>
       task.id === id ? { ...task, text: editedText.trim() } : task
     ));
     setEditingTask(null);
     setEditedText("");
   };

    // Fonction pour annuler l'édition
   const cancelEdit = () => {
     setEditingTask(null);
     setEditedText("");
   };

      
   // Fonction pour basculer le statut complété d'une tâche
   const toggleComplete = (id) => {
     setList(list.map(task =>
       task.id === id ? { ...task, completed: !task.completed } : task
     ));
   };

    useEffect(() => {
        console.log("chargement des donnees");
        const savedTodo = localStorage.getItem('Todos'); // recueille des donnees JSON et les stocker dans la variable savedTodo 
        const defaultTodo = [
            {id:0, text:"manger", completed:true},
            {id:1, text:"apprendre react", completed:false},
            {id:2, text:"creer une todo list", completed:false}
        ];
        if(savedTodo){ // verifier si les donnees ont bien ete recueillies 
            try{
                const ParsedTodos = JSON.parse(localStorage.getItem('Todos')); // convertir les donnees recueillies 
                setList(ParsedTodos);
                console.log("Donnees chargers", ParsedTodos);
            }catch(error){
                console.error("Erreur lors du chargement:", error);
            }
        }else{
            setList(defaultTodo);
        }
    }, []);
    
    useEffect(() => {
        if(list.length > 0){
            console.log("Sauvegarde des donnees", list);
            localStorage.setItem('Todos', JSON.stringify(list)) // stocker les donnees depuis React dans le localStorage du navigateur
            console.log("Donnees sauvegarder avec succes");
        }
    }, [list])
    
    return(
        <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header></Header>
      <main className="flex-grow p-4 md:p-8 flex justify-center item-start">

         <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 mt-4">
             <div  className="mb-6">
             <h1 className="text-3xl font-bold text-blue-800 mb-2">Ma TodoList</h1>
             </div>
            <div className="flex mb-6">
                <input type="text" value={task} onChange={(e) => setTask(e.target.value)} placeholder="Ajouter une tache..." 
                className="flex-grow py-2 px-4 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <button   className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-r-md transition duration-200 ease-in-out flex items-center
                 justify-center"onClick={addTodo}><Plus size={20} ></Plus></button>
             </div>
             {/* Section "Liste des tâches" */}
             <div  className=" text-black mb-6">
                 <h1 className="text-black text-2xl">Liste des taches</h1>
                 {list.length == 0?(

                     <div  className="text-center text-gray-500 py-8 ">
                         <p className="mb-2">Votre texte</p>
                         <p>Ajouter une tache</p>
                     </div>
                 ):(
                     <div className="space-y-3">
                         {list.map((task) => (
                         <div key={task.id} className="flex items-center p-3 border border-gray-200 rounded-mb bg-gray-50">
                             <Check size={18} className="bg-red-600 hover:bg-green-700 cursor-pointer border rounded-full " onClick={() => toggleComplete(task.id)}></Check>
                             {editedTask === task.id ? (<input type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} className="border p-2 bg-indigo-100 rounded"/>
                             ):(
                             <p onClick={() => navigate(`/detail/${task.id}`)} className="cursor-pointer">{task.text}</p>
                             )}
                         <Edit size={18} className="text-blue-500 cursor-pointer" onClick={()=> startEditing(task.id, task.text) } ></Edit>
                             <Save size={18} className="text-green-500 cursor-pointer" onClick={()=> saveEdit(task.id) }></Save>
                             <X size={18} className="text-red-500 cursor-pointer" onClick={()=> deleteTask(task.id)}></X>
                             </div>
                             ))}
                             <div className="flex items-center gap-2 cursor-pointer" onClick={() => toggleComplete(task.id)}>
                                 <span className={`${task.completed ? 'line-through text-gray-500' : ''}`}>
                                     {task.text}
                                 </span>
                             </div>
                     </div>
                 )}
             </div>
             <div className="flex justify-between text-sm text-gray-600 px-4 py-3 border-t">
                 <span>
                 {list.filter (t => !t.completed).length} restantes
                 </span>
                 <span>
                 {list.filter(t => t.completed).length} terminees
                 </span>
             </div>
        </div>
        </main>
        <Footer></Footer>
        </div>
    )
}
export default Todo