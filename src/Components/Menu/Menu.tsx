import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/identity/logo-lejour.png';

export default class Menu extends Component {
    render() {
        return (
            <nav className='dashboard-main-menu'>
                <div>
                    <Link to='/dashboard'>
                        <img src={logo} alt="" height='40'/>
                    </Link>
                </div>
                <div>
                    <ul className='links'>
                        <Link to='/dashboard' activeClassName="active">
                            <li>Visão Geral</li>
                        </Link>
                        <Link to='/usuarios'>
                            <li>Usuários</li>
                        </Link>
                        <Link to='/casamentos'>
                            <li>Casamentos</li>
                        </Link>
                        <Link to='/fornecedores'>
                            <li>Fornecedores</li>
                        </Link>
                        <Link to='/vendas'>
                            <li>Vendas</li>
                        </Link>
                    </ul>
                </div>
                <div>
                    <Link to='/'>
                        Sair
                    </Link>
                </div>
            </nav>
        )
    }
}
