import {useState} from 'react';


const Posts = ({posts}) => {

    const [sortedFields, setSortedFields] = useState({
        id:  false,
        title: false
    });


    const sortThisField = (fieldName,e) => {
        setSortedFields({
            [fieldName]: !sortedFields[fieldName]
        });
        switch (fieldName) {
            case 'id':
                sortedFields[fieldName] ?   posts.reverse() : (posts.sort((a,b) => a[fieldName] < b[fieldName] ? 1:-1))
                e.classList.toggle('ascending');
                return;

            case 'title':
                sortedFields[fieldName] ?   posts.reverse() : (posts.sort((a,b) => a[fieldName].length < b[fieldName].length ? 1:-1))
                e.classList.toggle('ascending');
                return;
        }
    }


    return(
        <div className="table_wrapper">
        <table>
           <tbody>
           <tr>
               <th className='descending' onClick={(e) => sortThisField('id', e.target)}>ID</th>
               <th className='descending' onClick={(e) => sortThisField('title', e.target)}>Title</th>
               <th disabled={true}>Body</th>
           </tr>


           {posts.length ? (posts.map((post,i) => (
               <tr key={i}>
                   <td >{post.id}</td>
                   <td >{post.title}</td>
                   <td >{post.body}</td>
               </tr>
           ))) : <tr className="warning"><td><h2 >Posts not found</h2></td></tr>}
           </tbody>
        </table>
        </div>
    )
}

export default Posts;