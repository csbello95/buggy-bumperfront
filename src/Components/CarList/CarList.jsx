import axios from "axios";
import React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../Constants";
import NewCar from "../NewCar";
import DeleteCar from "../DeleteCar";
import EditCar from "../EditCar";
import "./Carlist.scss";



const CarList = ({authorized, user,setAuth }) => {
    const [cars, setCars] = useState([]);
    const [showAdd, setShow] = useState(false);
    
    const [deleteModal, setDeleteModal] = useState({
        showModal: false,
        carId: undefined,
        pos: undefined,
    });

    const [editModal, setEditModal] = useState({
        showModal: false,
        carId: undefined,
        pos: undefined,
    });
    

    const navigate = useNavigate();
    
      useEffect(() => {
            if (!authorized) {
                navigate("/login");
            }else{
                const loadCars = async () => {
                //const data = await(await fetch(`${API_URL}/cars`)).json();
                const cars = (await axios.get(`${API_URL}/cars`));  
                setCars(cars.data);
            }
            loadCars();
          };
          
      }, [authorized,navigate]);

      const handleModalAdd = () => {
        setShow(true);
      }

    const handleModalDelete = (carId, pos) => {
       setDeleteModal({showModal:true, carId,pos})
    }

    const handleModalEdit = (carId, pos) => {
        setEditModal({showModal:true, carId,pos})
     }
    const logout = () => {
        localStorage.removeItem('authorized');
        setAuth(false);
        navigate("/");
    }
    return (
        <div className="card-list-container">
            <header className="car-list-header">
                <h1>BUGGY & BUMPER, INC </h1>
                <div className="user-info">
                <span>Usuario:{user}</span>
                <button onClick={()=>{logout()}}>Salir</button>
                </div>
            </header>
            <div className="list-car-title">
                <span className="list-new">Lista de carros</span>
                <button onClick={handleModalAdd}>Nuevo</button>
            </div>
            <section>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Marca</th>
                            <th>Puertas</th>
                            <th>Maletas</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars?.map(({_id, car_brand,number_doors,number_bags,image},i) => (

                            <tr key={i}>
                                <td>{_id}</td>
                                <td>{car_brand}</td>
                                <td>{number_doors}</td>
                                <td>{number_bags}</td>
                                <td>
                                    <button onClick={()=>handleModalEdit(_id,i)} >Editar</button>
                                    <button onClick={()=>handleModalDelete(_id,i)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        {/* <tr>
                        <td>xxxxxx</td>
                        <td>xxxxxx</td>
                        <td>xxxxxx</td>
                        <td>xxxxxx</td>
                        <td>
                       <button>Editar</button>
                       <button>Eliminar</button> 
                        </td>
                    </tr>
                    <tr>
                        <td>xxxxxx</td>
                        <td>xxxxxx</td>
                        <td>xxxxxx</td>
                        <td>xxxxxx</td>
                        <td>
                       <button>Editar</button>
                       <button>Eliminar</button> 
                        </td>
                    </tr> */}
                    </tbody>
                </table>
            </section>
            <NewCar show={showAdd} setShow={setShow} setCars={setCars} />
            <DeleteCar deleteModal={deleteModal} setDeleteModal={setDeleteModal} setCars={setCars} />
            <EditCar editModal={editModal} setEditModal={setEditModal} setCars={setCars} car={cars[editModal.pos]}/>
            </div>
    )
}

export default CarList;