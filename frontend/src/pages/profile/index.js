import React, {useEffect, useState} from "react";
import {Link, useHistory} from 'react-router-dom';
import './styles.css'

import {FiPower, FiTrash2} from 'react-icons/fi'

import logoImg from '../../assets/logo.svg';
import api from "../services/api";

export default function Profile() {

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('name');
    const [incidents, setIncidents] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api.get('profile', {
                    headers: {
                        Authorization: ongId
                    }
                })

                setIncidents(response.data)
            } catch (e) {
                console.log(e)
            }
        }

        fetchData();
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            const response = await api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch (e) {

        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar um novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>

            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )

}
