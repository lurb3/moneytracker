import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const useAuth = () => {
  const navigate = useNavigate();

  const logout = () => {
    Swal.fire({
    title: 'Are you sure you want to logout?',
    showCancelButton: true,
    confirmButtonText: 'Yes',
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  })
  }

  return {
    logout
  }
}

export default useAuth;