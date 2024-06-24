// import utils
import { Route, Routes } from "react-router-dom";
import { GlobalState } from './contexts/GlobalContext'
import { Auth } from './contexts/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css'

// import dei componenti
import DefaultLayout from "./layouts/DefaultLayout";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from './pages/HomePage'
import ShowPostPage from "./pages/ShowPostPage"
import PostsListPage from './pages/PostsListPage'
import CreatePost from './pages/CreatePost'
import SavePreviousPage from './pages/SavePrevPage.jsx';
import LoginPage from "./pages/Authentication/LoginPage.jsx";


function App() {


  return (
    <>
      <GlobalState>
        <SavePreviousPage />
        <Auth>
          <Routes>
            <Route path="/" element={<DefaultLayout />}>

              <Route index element={<HomePage />} />

              <Route path="login" element={<LoginPage />} />

              <Route path="posts">
                <Route index element={<PostsListPage />} />

                <Route path="create" element={<CreatePost />} />
                <Route path=":slug" element={<ShowPostPage />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />

            </Route>
          </Routes>
        </Auth>
      </GlobalState>
    </>
  )
}

export default App
