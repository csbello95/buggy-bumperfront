import React from 'react';
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { addCar } from '../../api/adminCar';
import './NewCar.scss'

const NewCar = ({ show, setShow, setCars }) => {
    const handleClose = () => setShow(false);

    const handleAddCar = async (event) => {
        event.preventDefault();
        const [car_brand, car_model, number_doors, number_bags, image, scale, rental_value] = event.target;
        let imageName = "No image";
        const file = image.files[0];

        if (file) {
            imageName = `${process.env.REACT_APP_IMAGE}${car_model.value}.${file.type.split("/")[1]}`;
        }


        const newCar = {
            car_brand: car_brand.value,
            car_model: car_model.value,
            number_doors: parseInt(number_doors.value) || 0,
            number_bags: parseInt(number_bags.value) || 0,
            file: file || null,
            image: imageName,
            scale: scale.value,
            rental_value: parseInt(rental_value.value)|| 0,
        }


        const car = await addCar(newCar);
        setCars(prevState => [...prevState, car]);
        handleClose();
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} size='xl' centered>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Carro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddCar}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={6} size="lg">Marca</Form.Label>
                            <Col sm={6}>
                                <Form.Control type="text" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                            <Form.Label column sm={6}>Modelo</Form.Label>
                            <Col sm={6}>
                                <Form.Control type="text" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                            <Form.Label column sm={6}>Número Puertas</Form.Label>
                            <Col sm={6}>
                                <Form.Control type="number" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                            <Form.Label column sm={6} >Número Maletas</Form.Label>
                            <Col sm={6}>
                                <Form.Control type="number" />
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
                                <Form.Control type="text" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
                            <Form.Label column sm={6}>Valor alquiler</Form.Label>
                            <Col sm={6}>
                                <Form.Control type="number" />
                            </Col>
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default NewCar;

