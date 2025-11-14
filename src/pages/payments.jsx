import { UserCircleIcon } from '@heroicons/react/24/outline';
import PageWrapper from '../layouts/PageWrapper';
import { React,useReducer } from 'react';


const Payments = () => {
const initialState = { count: 0};
const reducer = (state,action) => {
  switch(action.type){
    case 'increment':
      return {count: state.count + 1}
    case 'decrement':
      return {count: state.count -1 }
    default:
      throw new Error();
  }
}

const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <button className='bg-green' onClick={() => dispatch({type: 'increment'})}>+</button>
      {state.count}
      <button onClick={() =>  dispatch({type: 'decrement'})}>-</button>
    </div>
  );
};

export default PageWrapper(Payments);