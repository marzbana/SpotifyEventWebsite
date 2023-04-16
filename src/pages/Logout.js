import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const LogOut = () => {
  const navigate = useNavigate();
  useEffect (() => {
  
  fetch('http://localhost:8000/logout', {
    method: 'POST',
    credentials: 'include',
  })
  .then(response => {
    if (response.ok) {
      document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=localhost:8000/;";
      navigate('/?loggedIn=false');
    } else {
      navigate('/login?loggedIn=true');
    }
  })
  .catch(error => {
    navigate('/login?loggedIn=true');
    console.error(error);
    
  });
}, [navigate]);
}


export default LogOut;