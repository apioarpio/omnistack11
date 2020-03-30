import React, {useState} from "react";
import {Link, useHistory} from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi'

import api from '../services/api.js'

import './styles.css';
import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon() {

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await api.post('sessions', {id});
            console.log(response)

            localStorage.setItem('ongId', id)
            localStorage.setItem('name', response.data.name)

            history.push('/profile')

        } catch (e) {
            console.log(e)
            alert('Falha no login.')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input placeholder="Sua ID"
                           value={id}
                           onChange={event => setId(event.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#E02041"/>
                        Não Tenho Cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}
