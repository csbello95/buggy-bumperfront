import React from "react";
import { Button, Modal } from "react-bootstrap";
import { addRental } from "../../api/rentals";

const Pay = ({ payModal, setPayModal }) => {
    const { showModal, rentalData } = payModal;

    const handleClose = () => {
        setPayModal({
            showModal: false,
            rentalData: undefined,
        });
    };

    const handlePlay = async () => {
        const rental = await addRental(rentalData);
        if (rental) {
            alert('Pago realizado correctamente')

        }
        handleClose();

    }

    return (
        <>
            <Modal show={showModal} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar pago</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Email: {rentalData?.email}</p>
                    <p>Nombre: {rentalData?.name}</p>
                    <p>Teléfono: {rentalData?.phone}</p>
                    <p>Fecha de inicio alquiler: {rentalData?.from}</p>
                    <p>Facha fin alquiler: {rentalData?.to}</p>
                    <h3>Total: ${rentalData?.total.toLocaleString(navigator.language, { minimumFractionDigits: 0, })}</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handlePlay}>Finalizar Pago</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Pay;
