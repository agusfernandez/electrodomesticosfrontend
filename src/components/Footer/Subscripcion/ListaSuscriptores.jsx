const ListaSuscriptores = ({suscriptores}) =>{

    const listaSuscriptores = Array.isArray(suscriptores) ? suscriptores : [];
    return(
        <div>
                <ul>
                    {listaSuscriptores.map((correo, index  ) => (
                        <li className="mails-newsletter" key={index}>{correo}</li>
                        ))}
                </ul>
        </div>
    )
}

export default ListaSuscriptores;