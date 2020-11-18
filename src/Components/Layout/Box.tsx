import { throws } from 'assert'
import React, { Component } from 'react'

type Props = {
    title,
    customStyle?,
    transparent?: boolean
}

export default class Box extends Component<Props> {
    classString;

    render() {
        this.classString = 'box';
        if( this.props.transparent === true ) {
            this.classString += ' transparent';
        }

        return (
                <div className={this.classString} style={this.props.customStyle}>
                    <header>
                        <h3>{this.props.title}</h3>
                    </header>
                    <main>
                        {this.props.children}
                    </main>
                    <footer>
                    </footer>
                </div>
        )
    }
}
