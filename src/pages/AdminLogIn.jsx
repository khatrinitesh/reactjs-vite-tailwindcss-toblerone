import { useState } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

function AdminLogIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminData, setAdminData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleAdminInput = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleAdminLogIn = (e) => {
    e.preventDefault();
    console.log('submitted:', adminData);
    setIsLoggedIn(true);
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      alert('Invalid Username or Password');
    }
  };

  return (
    <section className="flex h-screen w-full items-center justify-center px-6 py-10">
      <form
        onSubmit={handleAdminLogIn}
        className="rounded-lg bg-whitish p-6 shadow-lg md:p-10"
      >
        <figcaption>
          <span className="header--pushDown headTitle block text-center text-[2.25rem] tracking-wider text-darkPink md:text-[2.75rem]">
            toblerone
          </span>{' '}
          <p className="headTitle mb-5 text-center text-sm leading-none">
            Login to Admin Dashboard
          </p>
        </figcaption>
        <input
          className="mb-4 w-full rounded-xl"
          name="username"
          type="text"
          value={adminData.username}
          onChange={handleAdminInput}
          placeholder="Username"
        />
        <input
          className="mb-4 w-full rounded-xl"
          name="password"
          type="password"
          value={adminData.password}
          onChange={handleAdminInput}
          placeholder="Password"
        />
        <div className="flex items-center justify-center">
          <Button
            label="log in"
            type="submit"
          />
        </div>
      </form>
    </section>
  );
}

export default AdminLogIn;
