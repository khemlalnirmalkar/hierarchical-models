// Scatterplot
import React, {Component} from 'react';
import * as d3 from 'd3';
import './ScatterPlot.css';
import ScatterPlot from './ScatterPlot';

// Scatterplot component
class ScatterPlotComponent extends Component {
    componentDidMount() {
        // Define scatterplot function
        this.scatter = ScatterPlot();
        this.update();
    }

    // Create chart
    update() {
        // Set margin
        let margin = {};
        if (this.props.settings.pack == true) {
            margin = {
                left: 0,
                bottom: 0,
                top: 0,
                right: 0
            };
        } else if (this.props.hideAxes == true) {
            margin = {
                left: 0,
                bottom: 0,
                top: 0,
                right: 0
            };
        } else {
            margin = {
                left: 70,
                bottom: 50,
                top: 0,
                right: 50
            }
        }
        // Update parameters
        this
            .scatter
            .width(this.props.width)
            .height(this.props.height)
            .colorScale(this.props.colorScale)
            .delay(this.props.delay)
            .xTitle(this.props.xTitle)
            .yTitle(this.props.yTitle)
            .radius(this.props.radius)
            .pack(this.props.settings.pack)
            .packValue('y')
            .hideAxes(this.props.settings.hideAxes)
            .packGroup('color')
        // .margin(margin) Call d3 update
        d3
            .select(this.root)
            .datum({scatter: this.props.data, pack: this.props.data, line: this.props.lineData})
            .call(this.scatter);
    }
    // Update on new props
    componentWillReceiveProps(props) {
        this.props = props;
        this.update();
    }

    render() {
        // Expose HTML node via ref property
        return (<div
            className="chart"
            style={{
            marginLeft: this.props.marginLeft
        }}
            width={this.props.width}
            height={this.props.height}
            ref={(node) => {
            this.root = node;
        }}/>);
    }
};

ScatterPlotComponent.defaultProps = {
    width: window.innerWidth * .6,
    height: window.innerHeight * .8,
    xTitle: 'X Title',
    colorScale: (d) => 'blue',
    yTitle: 'Y Title',
    title: 'Title',
    delay: (d) => 0,
    hideAxes: false,
    radius: (d) => d.selected == true
        ? 6
        : 10,
    fill: (d) => 'blue',
    settings: {
        pack: false
    },
    data: [
        {
            x: 10,
            y: 1000,
            id: "a"
        }, {
            x: 10,
            y: 1000,
            id: "b"
        }, {
            x: 5,
            y: 1200,
            id: "c"
        }
    ],
    lineData: []
}

export default ScatterPlotComponent;
