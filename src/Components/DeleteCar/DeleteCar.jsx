import React from 'react'
import { Button, Modal } from "react-bootstrap";
import { deleteCar } from '../../api/adminCar';
import "./DeleteCar.scss";



const DeleteCar = ({ deleteModal, setDeleteModal, setCars }) => {
    const {showModal, carId, pos} = deleteModal;
    
    const handleClose = () => {
        setDeleteModal({
            showModal:false,
            carId:undefined,
            pos:undefined,
        });
    };

    const handleDeleteCar = async () => {
        const deletedCar = await deleteCar(carId);
        
        if (deletedCar) {
            setCars((prevState) => {
                const newCarList = [...prevState];
                newCarList.splice(pos, 1);
                return newCarList;
              });    
        }
        handleClose();
    };

    

    return (
        <>
            <Modal show={showModal} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar Carro</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <p>Esta Seguro que desea eliminar el carro ID {carId}?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleDeleteCar}>Eliminar</Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default DeleteCar;
