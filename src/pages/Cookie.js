import Cookies from 'js-cookie';

export function checkCookie() {
  const userId = Cookies.get('user_id');
  if (userId) {
    console.log('User ID exists in cookie:', userId);
    return true;
  } else {
    console.log('User ID does not exist in cookie');
    return false;
  }
}

export function deleteCookie() {
  Cookies.remove('user_id');
}


