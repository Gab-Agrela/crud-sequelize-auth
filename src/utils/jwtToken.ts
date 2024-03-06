import { SignJWT } from "jose";
import "dotenv/config";

const generateJwtToken = async (username: string, id: number) => {
  const { SECRET_JWT, ALG_JWT, ISSUER_JWT, AUDIENCE_JWT } = process.env;
  const secretKey = new TextEncoder().encode(SECRET_JWT);

  const token = await new SignJWT({ username, id })
    .setProtectedHeader({ alg: ALG_JWT as string })
    .setIssuedAt()
    .setIssuer(ISSUER_JWT as string)
    .setAudience(AUDIENCE_JWT as string)
    .setExpirationTime("10h")
    .sign(secretKey);

  return token;
};

export default generateJwtToken;
