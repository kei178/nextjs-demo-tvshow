import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import cookies from 'nookies';

import CustomInput from '../components/CustomInput';
import validateEmail from '../utils/validators/validateEmail';
import validateRequired from '../utils/validators/validateRequired';

const initialState = {
  email: '',
  password: '',
};

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState(initialState);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, name } = signupInfo;

    if (!email || !password || !name) {
      return;
    }

    try {
      const response = await axios.post(
        'https://iwallet-api.herokuapp.com/api/auth/signup',
        { ...signupInfo }
      );

      cookies.set(null, 'token', response.data.token, { path: '/' });
      router.replace('/[country]', '/us');
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({
      ...signupInfo,
      [name]: value,
    });
  };

  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        <CustomInput
          name="name"
          placeholder="Enter your email"
          value={signupInfo.email}
          onChange={handleInputChange}
          onBlur={validateRequired}
        />
        <CustomInput
          type="email"
          name="email"
          placeholder="Enter your email"
          value={signupInfo.email}
          onChange={handleInputChange}
          onBlur={validateEmail}
        />
        <CustomInput
          type="password"
          name="password"
          placeholder="Enter your password"
          value={signupInfo.password}
          onChange={handleInputChange}
          onBlur={validateRequired}
        />

        {error && <div className="error">{error}</div>}

        <Link href="/signin">
          <a>Already have an account</a>
        </Link>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
