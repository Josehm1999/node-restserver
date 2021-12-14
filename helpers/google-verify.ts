import {OAuth2Client, TokenPayload} from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function googleVerify(token: string) {
    const ticket = await client.verifyIdToken({
	idToken: token,
	audience: process.env.GOOGLE_CLIENT_ID,  
  });
    const {name:nombre, picture: img, email: correo} = ticket.getPayload() as TokenPayload ;

    return {
	nombre,
	img,
	correo
    }
}

