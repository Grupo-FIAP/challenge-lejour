import React, { Component } from 'react'
import {Link} from 'react-router-dom';

type Props = {
    route?: [
        {
            name,
            route
        }
    ]
}

export default class Breadcrumb extends Component<Props> {
    
    finalRoute: any[] = [];

    constructor( props ) {
        super(props);

        if( this.props.route ) {
            this.finalRoute = this.props.route;
        } 
    }

    renderSteps() {
        if( this.props.route !== null && this.props.route !== undefined ) {
            return this.props.route.map( x => {
                <li><Link to={x.route}>x.name</Link></li>
            })
        }

        return;
    }

    render() {
        return (
            <div className='breadcrumb'>
                <ul>
                    { this.renderSteps() }
                </ul>
            </div>
        )
    }
}
