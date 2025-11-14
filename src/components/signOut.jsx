import { useDispatch } from 'react-redux';
import { logoutUser } from './userSlice';

const signOut = () =>{
    const dispatch = useDispatch();
    dispatch(logoutUser());

} 

export default signOut;