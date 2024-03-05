import User from "../database/models/User";

const resp = (
  status: number,
  message: User
): { status: number; message: User } => ({ status, message });

export default resp;
