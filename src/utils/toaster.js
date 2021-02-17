import { toast } from "react-toastify";

const error = (err) => toast.error(err, { autoClose: 3500 });
const info = (msg) => toast.info(msg, { autoClose: 3500 });

export default { error, info };
