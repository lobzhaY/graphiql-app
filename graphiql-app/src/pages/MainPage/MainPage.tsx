import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { authFirebase, dbFirebase, logout } from '../../utils/firebase/firebase';
import { query, collection, getDocs, where } from 'firebase/firestore';

function MainPage() {
  const [user, loading, error] = useAuthState(authFirebase);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(dbFirebase, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert('An error occured while fetching user data');
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');
    fetchUserName();
  }, [user, loading]); 

  return (
    <div>
      <div>
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button onClick={logout}>
          Logout
        </button>
      </div>
      <p>Содержимое MAIN PAGE</p>
      <Link to="/authorization/login">Авторизация</Link>
    </div>
  );
}

export default MainPage;
