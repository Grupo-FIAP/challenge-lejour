import React, { Component } from 'react'

type Props = {
    goalName,
    goal: number,
    goalCurrent: number,
    isCurrency?: {
        digits: number,
        preffix: string
    },
    barColor?
}

export default class GoalBar extends Component<Props> {

    static defaultProps = {
        isCurrency: null,
    }

    render() {
        
        if( this.props.barColor != null ) {

        }

        let goalDisplay = Math.ceil( this.props.goal ).toString();
        let goalCurrentDisplay = this.props.goalCurrent.toString();

        if( this.props.isCurrency != null ) {
            goalDisplay = 
            this.props.isCurrency.preffix 
            + " "
            + this.props.goal.toFixed( this.props.isCurrency.digits ).toString();

            goalCurrentDisplay = 
            this.props.isCurrency.preffix
            + " "
            + this.props.goalCurrent.toFixed( this.props.isCurrency.digits ).toString();
        }

        return (
            <div className='goal-bar'>
                <strong>{ this.props.goalName }</strong>
                <br/><sub>{ goalCurrentDisplay } de { goalDisplay }</sub>
                <progress value={this.props.goalCurrent} max={this.props.goal}></progress>
            </div>
        )
    }
}
