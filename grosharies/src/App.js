import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import CreateItem from './components/CreateItem'
import ShowItemList from './components/ShowItemList'
import ShowItemDetails from './components/ShowItemDetails'
import UpdateItemInfo from './components/UpdateItemInfo'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<ShowItemList />} />
          <Route path='/create-item' element={<CreateItem />} />
          <Route path='/edit-item/:id' element={<UpdateItemInfo />} />
          <Route path='/show-item/:id' element={<ShowItemDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
