import React, { Component } from 'react'
import Menu from '../Menu/Menu'
import Breadcrumb from './Breadcrumb'

type Props = {
    title
}

export default class DashboardViewport extends Component<Props> {

    
    render() {
        return (
            <>
                <Menu/>
                <div className="dashboard-viewport">
                    <h1>{ this.props.title }</h1>
                    <Breadcrumb></Breadcrumb>
                    { this.props.children }
                </div>
            </>
        )
    }
}
