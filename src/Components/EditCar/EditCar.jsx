import React from 'react'
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { updateCar } from "../../api/adminCar";

const EditCar = ({ editModal, setEditModal, setCars, car }) => {
    const { showModal, carId, pos } = editModal;

    const handleClose = () => {
        setEditModal({
            showModal: false,
            carId: undefined,
            pos: undefined,
        });
    }

    const handleEditCar = async (event) => {
        event.preventDefault();
        const [car_brand, car_model, number_doors, number_bags, image, scale, rental_value] = event.target;
        let imageName = car.image;
        const file = image.files[0];
        
        if (file) {
            imageName = `${process.env.REACT_APP_IMAGE}${car_model.value}.${file.type.split("/")[1]}`;
        }

        const updatedCar = {
            car_brand: car_brand.value,
            car_model: car_model.value,
            number_doors: parseInt(number_doors.value)|| 0,
            number_bags: parseInt(number_bags.value)||0,
            file: file || null,
            image: imageName,
            scale: scale.value,
            rental_value: parseInt(rental_value.value)||0,
        };
        const finalCar = await updateCar(carId, updatedCar);
        finalCar._id = carId;
        setCars((prevState) => {
            const newCarList = [...prevState];
            newCarList[pos] = finalCar;
            return newCarList;
        });
        handleClose();
    };

    return (
        <>
            <Modal show={showModal} onHide={handleClose} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Carro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditCar}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={6} size="lg">Marca</Form.Label>
                            <Col sm={6}>
                                <Form.Control type="text" defaultValue={car?.car_brand} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                            <Form.Label column sm={6}>Modelo</Form.Label>
                            <Col sm={6}>
                                <Form.Control type="text" defaultValue={car?.car_model} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                            <Form.Label column sm={6}>Número Puertas</Form.Label>
                            <Col sm={6}>
                                <Form.Control type="number" defaultValue={car?.number_doors} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                            <Form.Label column sm={6} >Número Maletas</Form.Label>
                            <Col sm={6}>
                                <Form.Control type="number" defaultValue={car?.number_bags} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                            <Form.Label column sm={6}>Imagen</Form.Label>
                            <Col sm={6}>
                                <Form.Control type="file" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                            <Form.Label column sm={6}>Gama</Form.Label>
                            <Col sm={6}>
                                <Form.Control type="text" defaultValue={car?.scale} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                            <Form.Label column sm={6}>Valor alquiler</Form.Label>
                            <Col sm={6}>
                                <Form.Control type="number" defaultValue={car?.rental_value} />
                            </Col>
                        </Form.Group>

                        <Modal.Footer>
                            <Button type="submit">
                                Editar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditCar;
