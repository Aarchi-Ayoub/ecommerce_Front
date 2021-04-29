import React, { useState } from 'react'

const FilterCat = ({categories, handelFilter}) => {
    // State
    const [checked] = useState(new Set());
    // Handels changes
    const handelChanges = (category)=>{
        if(checked.has(category._id)){
            checked.delete(category._id)
        }else{
            checked.add(category._id)
        }
        // Send the checked ID to comp parent
        /* Convert the set to an array */
        handelFilter(Array.from(checked)) 
    }
    return (
        <div>
            <h4>Filter by categories :</h4>
            <ul>
                {
                    categories && categories.map((c,i)=>(
                        <li key={i} className="list-unstyled my-3">
                            <div className="form-check form-check-inline">
                            <label className="form-check-label" htmlFor={i}>
                                <input 
                                    onChange = {()=>handelChanges(c)}
                                    className="form-check-input" 
                                    type="checkbox"
                                    id={i} 
                                    value={c._id} />
                                    {c.name}
                            </label>
                            </div>
                        </li>
                        
                    ))
                }
            </ul>
        </div>
    )
}

export default FilterCat
