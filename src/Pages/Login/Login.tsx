import React, { Component } from 'react';
import LogoLejourAbreviado from '../../assets/identity/logo-lejour-abreviado.png';
import ImagemCasamento from '../../assets/images/casamento-1.jpg';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    render() {
        return (
            <>
                <div className="background-goiaba background-fullsize">
                    <div className='login'>
                        <div className="login-form">
                            <img src={LogoLejourAbreviado} className='logo-login'/>
                            <div className="spacer-2"></div>
                            <h2>Login</h2>
                            <p>Este é um site seguro. Por favor, insira abaixo suas informações de login.</p>
                            <section>
                                <div className="field">
                                    <label htmlFor="" className="label">Usuário / Login</label>
                                    <div className="control">
                                        <input name='username' type="text" placeholder="exemplo@email.com" className="input"/>
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="" className="label">Senha</label>
                                    <div className="control">
                                        <input name='password' type="password" placeholder="" className="input"/>
                                    </div>
                                </div>
                                <div className="spacer-2"></div>
                                <div className="has-text-right">
                                    <Link to='/dashboard'>
                                        <button type="submit" className='button button-rounded is-primary is-gradient'>Efetuar Login</button>
                                    </Link>
                                </div>
                            </section>
                        </div>
                        <div className="login-illustration">
                            <img src={ImagemCasamento} alt="" />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
