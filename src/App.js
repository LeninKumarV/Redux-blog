import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Features/Navbar/Navbar";
import AddPosts from "./Features/Posts/AddPosts";
import Posts from "./Features/Posts/Posts";
import SinglePost from "./Features/Posts/SinglePost";
import EditPost from "./Features/Posts/EditPost";
import UsersList from "./Features/Users/UsersList";
import UserPosts from "./Features/Users/UserPosts";

function App() {
  return (
    <section>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/addPost" element={<AddPosts />} />
          <Route path="/viewPost/:id" element={<SinglePost />}/>
          <Route path="/editPost/:id" element={<EditPost />} />
          <Route path="/usersList" element={<UsersList/>}/>
          <Route path="/userPost/:id" element={<UserPosts/>} />
        </Routes>
      </main>
    </section>
  );
}

export default App;
