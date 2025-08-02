const Footer = ({titre="Pied de la page", prop="blue"}) => {
    return(
     <div style={{backgroundColor:prop}}>
         <h1>{titre}</h1>
         <p>Entrez les valeurs</p>
     </div>   
    )
}
export default Footer