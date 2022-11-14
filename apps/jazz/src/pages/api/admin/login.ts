import { NextApiResponse, NextApiRequest } from 'next';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import { setCookie } from '@/utils/cookies';

const { MONGO_URI } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const client = new MongoClient(MONGO_URI);

    // Check if the user is already logged in.
    if (req.cookies['isAdmin'] === 'true') {
      return res.status(200).json({ status: 200 });
    }

    // Extract the required details from the request.
    const { username, password } = req.body;

    // If either value is missing respond with a bad request.
    if (!username || !password) {
      return res.status(400).json({
        status: 400,
        message: 'Request is missing data.',
      });
    }

    try {
      await client.connect();
      const accounts = client.db('Project').collection('Administrators');

      // Get the specific user by username.
      const user = await accounts.findOne({ username });

      // Verify that the user attempting to sign in exists.
      if (!user) {
        return res.status(404).json({
          status: 404,
          message: 'No user found.',
          data: { username },
        });
      }

      // Verify that the password entered is correct.
      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        return res.status(401).json({
          status: 401,
          message: 'Incorrect password provided.',
          data: { username },
        });
      } else {
        // Remove the password from the response.
        const clone = { ...user };
        delete clone.password;

        // Send a cookie so the user does not need to re-enter their credentials.
        setCookie(res, 'isAdmin', true, {
          maxAge: 86400 * 1000, // Cookie will timeout after 24hrs.
          httpOnly: true,
          secure: true,
        });

        return res.status(200).json({
          status: 200,
          data: { user: clone },
        });
      }
    } catch (err) {
      console.error('Error logging in:', err);
      return res.status(500).json({
        status: 500,
        message: 'An unknown error occurred.',
      });
    } finally {
      client.close();
    }
  }
}
