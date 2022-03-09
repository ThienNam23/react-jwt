import { useState } from "react";
import { Button, Modal, Nav } from "react-bootstrap";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { notify } from "../services/toast";
import Header from "../components/Header";

const Home = () => {

    const axiosPrivate = useAxiosPrivate();

    const handleResponse = (response) => {
        console.log(response);
        notify(response.data.httpCode + ": " + response.data.message, 'success');
    }

    const handleError = (error) => {
        console.log(error.response);
        notify(error.response.status, 'error');
    }

    const fetchData = () => {
        axiosPrivate.get('/api/v1/employees/test')
            .then(handleResponse)
            .catch(handleError);
    }

    const fetchAdminData = () => {
        axiosPrivate.get('/api/v1/admin/test')
            .then(handleResponse)
            .catch(handleError);
    }

    const postData = () => {
        axiosPrivate.post('/api/v1/employees/test', {})
            .then(handleResponse)
            .catch(handleError);
    }

    const postAdminData = () => {
        axiosPrivate.post('/api/v1/admin/test', {})
            .then(handleResponse)
            .catch(handleError);
    }


    return (
        <main>

            <div className="container text-center" style={{ marginTop: "50px" }}>
                <div className="container mt-3">
                    <button className="btn btn-primary me-3" onClick={fetchData}>Fetch data</button>
                    <button className="btn btn-primary" onClick={fetchAdminData}>Fetch Admin data</button>
                </div>
                <div className="container mt-3">
                    <button className="btn btn-primary me-3" onClick={postData}>Post data</button>
                    <button className="btn btn-primary" onClick={postAdminData}>Post Admin data</button>
                </div>
            </div>
        </main>
    );
}

export default Home;