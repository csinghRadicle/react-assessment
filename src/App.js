import logo from './logo.svg';
import './App.css';
import { Layout, Space, Button, Typography } from 'antd';

import { ReactSearchAutocomplete } from 'react-search-autocomplete'
function App() {
  const redux=require('redux');
const createStore=redux.createStore;
const combineReducers=redux.combineReducers;
const applyMiddleware =redux.applyMiddleware;

const intialStateBooks={
    numberOfBooks:10,
}

const intialStatePens={
    numberOfPens:15
}

// action creator: wraping the action in a single function
function buyBook(){
    return {
        type:"Buy_Book",
        payload:"My First Action"
    }
}

function buyPen(){
    return {
        type:"Buy_Pen",
        payload:"My Second Action"
    }
}
// (prevState,action)=>newState

const booksReducer =(state=intialStateBooks,action)=>{
    switch(action.type){
        case "Buy_Book":return{
            ...state,
            numberOfBooks:state.numberOfBooks-1
        }

        default: return state;
    }
}

const pensReducer =(state=intialStatePens,action)=>{
    switch(action.type){
        
        case "Buy_Pen":return{
            ...state,
            numberOfPens:state.numberOfPens-2
        }

        default: return state;
    }
}

const reducer=combineReducers({
    booksReducer,
   pensReducer
});

const logger=store=>{

    return next=>{
        return action=>{
            const result=next(action);
            console.log("middleware log",result);
            return result;
        }
    }
}



const store =createStore(reducer,applyMiddleware(logger));

console.log("Initial State",store.getState());
const unsubscribe=store.subscribe(()=>{console.log('Updated State Value', store.getState())});
store.dispatch(buyBook());
store.dispatch(buyBook());
store.dispatch(buyBook());
store.dispatch(buyPen());
store.dispatch(buyPen());
store.dispatch(buyPen());
unsubscribe();


  const { Title } = Typography;
  const items = [
    {
      id: 0,
      name: 'Cobol'
    },
    {
      id: 1,
      name: 'JavaScript'
    },
    {
      id: 2,
      name: 'Basic'
    },
    {
      id: 3,
      name: 'PHP'
    },
    {
      id: 4,
      name: 'Java'
    }
  ]
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }
  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>name: {item.name}</span>
      </>
    )
  }

  return (
    <div className="App">
    <Space direction="horizontal" style={{ width: '100%', alignItems:'inherit' }}>
     {/* <Layout> */}
     <div style={{ width: 650, padding: 55, height:'100%' }}>
      <Title level={2}>Redux Saga</Title>
       <Button type="primary">Primary Button</Button>
       </div>
     {/* </Layout> */}
      
      <header className="App-header" style={{alignItems:'inherit'}}>
      <Title level={2} style={{color: 'white'}}>Redux Saga</Title>
        <div style={{ width: 650, padding: 55 }}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
        </div>
      </header>
      
       </Space>
    </div>

    
  );
}

export default App;