import { IsNotEmpty, IsString, validateSync } from 'class-validator';

interface IEnv {
  jwtSecret: string;
  jwtSignExpiresIn: string;
}

class Env implements IEnv {
  @IsString()
  @IsNotEmpty()
  jwtSecret: string;

  @IsString()
  @IsNotEmpty()
  jwtSignExpiresIn: string;
}

const env = new Env();

env.jwtSecret = process.env.JWT_SECRET;
env.jwtSignExpiresIn = process.env.JWT_SIGN_EXPIRES_IN;

export { env };

const errors = validateSync(env);

if (errors.length > 0) {
  throw new Error(JSON.stringify(errors, null, 2));
}
