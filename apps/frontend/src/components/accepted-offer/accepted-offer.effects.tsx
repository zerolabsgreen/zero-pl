import { useFormik } from 'formik';
import { useNavigate } from 'react-router';

export const useAcceptedOfferEffects = () => {
  const navigate = useNavigate();

  const form = useFormik({
    initialValues: {
      recAddress: '',
      email: '',
      name: '',
      vat: '',
      address: '',
      crypto: '',
    },
    onSubmit: (values) => {
      console.log(values);
      navigate('/thank-you');
    },
  });

  return {
    form,
  };
};
