import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const _ = require('lodash');
const COLORS = ['#69D998', '#A074DB', '#EE5E62', '#EDDE77', '#F4A367', '#55B6E1', '#EA79EC', '#ACD874'];

const renderTooltip = (data) => {
    const itemData = (data.payload && data.payload.length > 0) ? data.payload[0].payload : null;
    return itemData ? (
        <div className="chartTooltip">{itemData.name}: {itemData.itemStock.quantity}</div>
    ) : null;
}

const customizedAxisTick = (props) => {
    const {x, y, stroke, payload} = props;
    const tickName = (payload.value.length > 7) ? `${payload.value.substr(0,6)}...` : payload.value;
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{tickName}</text>
        </g>
    );
}

const InventoryChart = (props) => {


    if (_.isEmpty(props.inventory)) {
        return null;
    }
    return (
        <ResponsiveContainer width="100%" height="50%">
            <BarChart

                data={props.inventory}
                margin={
                    {
                        top: 5, right: 30, left: 20, bottom: 30
                    }
                }
            >
                <XAxis dataKey="name" tick={customizedAxisTick}/>
                <YAxis />
                <CartesianGrid strokeDasharray="3" />
                <Tooltip content={renderTooltip} />
                <Bar dataKey="itemStock.quantity">
                    {
                        props.inventory.map((entry, index) => {
                            const color = COLORS[index % COLORS.length];
                            return <Cell key={entry.id} fill={color} />;
                        })
                    }
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default InventoryChart;
