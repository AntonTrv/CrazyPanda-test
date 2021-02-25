import React from 'react';


const Pagination = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
        pageNumbers.push(i)
    }


    return(
        <nav>
            <ul>
                {pageNumbers.map((number,i) => (
                    <li key={i} >
                        <a onClick={() => paginate(number)} href="!#" className="link">{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export  default Pagination