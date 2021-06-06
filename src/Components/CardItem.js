import React from 'react'

export default function CardItem({category,description,created, index}) {
    //console.log(category)
    return (
        <div className="card-item">
            <div className="upper">
                <h5>Alumni Membership Form Template</h5>
                <p>{description}</p>
                {/* <p>{created}</p> */}
            </div>
            <div className="lower">
                <span>Use Template</span>
            </div>
        </div>
    )
}
