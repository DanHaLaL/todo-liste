import { useState } from "react";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import {useParams} from "react-router-dom"
import Header from '../Component/Header.jsx';
import Footer from '../Component/Footer.jsx';
import { ArrowLeft } from "lucide-react";
const Detail = () => {
    const {id} = useParams();
    const [Todo, setTodo] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const data = localStorage.getItem('Todos');
        if(data){
            try{
                const parsedData = JSON.parse(data);
                const tmp = parsedData.find(t => t.id === parseInt(id));
                if(tmp){
                    setTodo(tmp);
                }else{
                    navigate('/');
                }
            }catch(error){
                console.error("Erreur lors du chargement", error)
            }
        }else{
            console.log();
            navigate('/')
        }
    }, []);

    return (
        <div className="bg-gray-100 flex flex-col">
            <Header />
        <div className="bg-gray-100 p-10">
          <h1 className="text-3xl font-bold text-blue-800 mb-6">Détail de la tâche</h1>
          {Todo ? (
            <div className="bg-white shadow rounded-lg p-4">
              <p className="bg-blue-500  rounded  px-4 py-4"><strong>Tache :</strong> {Todo.text}</p>
              <p className="bg-green-700 rounded  py-4 my-4"><strong>Statut :</strong> {Todo.completed ? "Terminée" : "En cours"}</p>
              <button
               className="flex items-center mt-4 gap-16 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={() => navigate('/')}
              >
                <ArrowLeft size={30} className="text-white-900 hover:text-red-800"/>
                Retour à la liste
              </button>
            </div>
          ) : (
            <p>Chargement...</p>
          )}
        </div>
        <Footer/>
        </div>
      );
      
}
export default Detail 