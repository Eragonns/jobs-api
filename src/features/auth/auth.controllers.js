import { StatusCodes } from "http-status-codes";
import * as usersServices from "../users/users.services.js";
import { UnauthenticatedError } from "../../errors/index.js";
import job from "../jobs/jobs.model.js";
import notFound from "../../middlewares/not-found.middlewares.js";

const register = async (req, res) => {
  console.log(req.body);

  const user = await usersServices.create(req.body);
  const token = user.createAccessToken();
  res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
  const user = await usersServices.get({ email: req.body.email });
  if (!user) throw new UnauthenticatedError("Identifiants invalides");

  const isPasswordCorrect = await user.comparePasswords(req.body.password);

  if (!isPasswordCorrect)
    throw new UnauthenticatedError("Identifiants invalides");

  const token = user.createAccessToken();

  res.status(StatusCodes.OK).json({ user: { userId: user._id }, token });
};

const dashboard = async (req, res) => {
  const { id } = req.params;
  const jobs = await job.findById(id);
  if (!jobs) throw new notFound("job introuvable");
  res.status(StatusCodes.OK).json({ jobs });
};

export { register, login, dashboard };
