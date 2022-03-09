import { useState } from "react";
import { Button, Modal, Nav } from "react-bootstrap";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { notify } from "../services/toast";

const Header = () => {
    const [show, setShow] = useState(false);
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const handleClose = () => setShow(false);

    const handleLogout = () => {
        setShow(false);
        setAuth({});
        notify('Logout successful', 'success');
        navigate('/login', { replace: true });
    }
    return (
        <>
            <Nav className="justify-content-center" activeKey="/">
                <Nav.Item>
                    <Nav.Link eventKey="/" as={Link} to="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/login" as={Link} to="/login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/logout" onClick={() => setShow(true)}>Logout</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/signup" as={Link} to="/signup">Signup</Nav.Link>
                </Nav.Item>
            </Nav>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    );
}

export default Header;