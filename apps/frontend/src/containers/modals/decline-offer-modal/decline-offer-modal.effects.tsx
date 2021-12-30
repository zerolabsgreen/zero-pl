import { useFormik } from 'formik';

export const useDeclineOfferModalEffects = () => {
  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return {
    formik,
  };
};
