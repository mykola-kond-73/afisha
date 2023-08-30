'use client'

import classes from './loader.module.scss'

export const Loader = () => {
    return (
        <div className={classes.root}>
            <div className={classes.ldsRipple}><div></div><div></div></div>
        </div>
    )
}