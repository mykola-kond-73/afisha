'use client'

import classes from './footer.module.scss'

export const Footer=()=>{
    return(
        <section className={classes.section}>
            <div>
                <span>Phone: </span><a type="tel" >+380912223311</a>
            </div>
        </section>
    )
}