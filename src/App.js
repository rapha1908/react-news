import logo from './logo.svg';
import './App.css';
import { Component } from "react";
import { PostCard } from './components/Postcard';

class App extends Component {

    state = {
        counter: 0,
        posts: [{
                id: 1,
                title: "titulo1",
                body: "corpo 1 "
            },
            {
                id: 2,
                title: "titulo2",
                body: "corpo 2 "
            },
            {
                id: 3,
                title: "titulo3",
                body: "corpo 3 "
            },
        ]
    };


    componentDidMount() {
        this.loadPosts()
    }

    loadPosts = async() => {
        const postsResponse = fetch("https://jsonplaceholder.typicode.com/posts");
        const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos");
        
        const [posts, photos] = await Promise.all([postsResponse, photosResponse]);
        
        const postsJson = await posts.json();
        const photosJson = await photos.json();

        const postAndPhotos = postsJson.map((post, index) =>{
            return{
                ...post,
                cover: photosJson[index].url
            }
        })

        this.setState({ posts: postAndPhotos })
    }

    render() {
        const { posts } = this.state;
        return (
          <section className="container">
            <div className="posts">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post}/> 
               
                  ))}

               
              
            </div>
          </section>
        );
    }
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;