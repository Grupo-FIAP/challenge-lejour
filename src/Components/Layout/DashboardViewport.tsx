import React, { Component } from 'react'
import Menu from '../Menu/Menu'
import Breadcrumb from './Breadcrumb'

type Props = {
    title,
    breadcrumb?
}

export default class DashboardViewport extends Component<Props> {
    
    
    render() {
        return (
            <>
                <Menu/>
                <div className="dashboard-viewport">
                    <h1>{ this.props.title }</h1>
                    <Breadcrumb route={this.props.breadcrumb}></Breadcrumb>
                    { this.props.children }
                </div>
            </>
        )
    }
}
