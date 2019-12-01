import { toast } from 'react-toastify';

export const toastError = (err) => toast.error(err, { autoClose: 3500 });
