import Header from '../Component/Header.jsx'
import { useState } from 'react'
import {useEffect} from "react"
const Page2 = () => {
    const [list, setList] = useState([])
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
   

    return(
        <div  className="min-h-screen bg-gray-100 flex flex-col">
            
        <div>
          <Header></Header>
            <div  className=" text-black mb-6">
                 <h1 className="text-black text-2xl">Liste des taches</h1>
                 {list.length == 0?(
                     
                     <div  className="text-center text-gray-500 py-8 ">
                         <p className="mb-2">Votre texte</p>
                         <p>Ajouter une tache</p>
                     </div>
                 ):(
                     <div>
                         {list.map(task => (
                         <div key={task.id}>
                             <p>{task.text}</p>
                             </div>
                             ))}
                     </div>
                 )}
             </div>
        </div>
        </div>
    )
}
export default Page2