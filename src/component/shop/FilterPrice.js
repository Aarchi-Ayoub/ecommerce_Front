import React from 'react'

const FilterPrice = ({handelFilter}) => {
    // Price array
    const price = [
        {
            _id     : 1,
            name    : "0 to 50",
            value   : [0,51]
        },
        {
            _id     : 2,
            name    : "50 to 100",
            value   : [51,101]
        },
        {
            _id     : 3,
            name    : "100 to 200",
            value   : [101,201]
        },
        {
            _id     : 4,
            name    : "More",
            value   : [201,1000]
        },
        {
            _id     : 5,
            name    : "All",
            value   : []
        }
    ];
    // Handels changes
    const handelChanges = (e)=>{
        // Send the value to parent comp as a array value by index
        handelFilter(price[e.target.value]['value'])
    }
    return (
        <div>
            <h4>Filter by price :</h4>
            {
                price.map((p,i)=>(
                    <div key={i}>
                        <label className="ml-4" htmlFor={`${i}-${p.name}`}>
                            <input
                                onChange={handelChanges} 
                                className="mx-2" 
                                type="radio"
                                name="price" 
                                id={`${i}-${p.name}`}
                                value={i} /> {p.name}
                        </label>
                    </div>
                ))
            }
        </div>
    )
}

export default FilterPrice
