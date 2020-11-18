import React, { Component } from 'react'
import { Link } from 'react-router-dom';

type Props = {
    icon?,
    name?,
    data: {
        stat?
        about?
    },
    link
}

export default class MetricOverview extends Component<Props> {

    static defaultProps = {
        icon: null,
        name: 'Metric'
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='metric-overview'>
                <section className="info">
                    <div className="icon">
                        <img src={this.props.icon} alt=""/>
                    </div>
                    <div className="data">
                        <div className='stat'>{ this.props.data.stat }</div>
                        <div className='about'>{ this.props.data.about }</div>
                    </div>
                </section>
                <section className="actions has-text-centered">
                    <Link to={this.props.link}>
                        Ver tudo sobre {this.props.name}
                    </Link>
                </section>
            </div>
        )
    }
}
