import Home from 'src/pages/Home';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import DetailGalery from 'src/pages/DetailGalery';
import Footer from 'src/components/footer/Footer';
import Navbar from 'src/components/navbar/Navbar';
// import Backend from 'src/pages/project/Backend';
// import Frontend from 'src/pages/project/Frontend';
import NotFound from 'src/pages/NotFound';
import Feedback from 'src/pages/feedback';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galery" element={<DetailGalery />} />
        {/* <Route path="/project/frontend" element={<Frontend />} />
        <Route path="/project/backend" element={<Backend />} /> */}
        <Route path="/feedback" element={<Feedback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
