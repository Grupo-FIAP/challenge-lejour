import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Menu extends Component {
    render() {
        return (
            <nav className='dashboard-main-menu'>
                <div>
                    <Link to='/dashboard'>
                        Lejour Dashboard
                    </Link>
                </div>
                <div>
                    <ul className='links'>
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
