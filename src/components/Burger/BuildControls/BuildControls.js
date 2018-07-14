import React from 'react'

import classes from './BuildControls.css'

import BuildControl from './BuildControl/BuildControl'

const controls=[
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'}
]

const buildControls =(props)=>(
    <div className={classes.BuildControls}>
        {controls.map((i) => (
             <BuildControl key={i.label}
              label={i.label}
              added={()=>props.ingredientAdded(i.type)}
              />
        ))}
    </div>
)

export default buildControls