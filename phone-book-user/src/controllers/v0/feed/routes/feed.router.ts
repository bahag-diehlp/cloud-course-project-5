import {Router, Request, Response} from 'express';
import {User} from '../models/User';
import {NextFunction} from 'connect';
import * as jwt from 'jsonwebtoken';
import * as AWS from '../../../../aws';
import * as c from '../../../../config/config';

const router: Router = Router();

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({message: 'No authorization headers.'});
  }

  const tokenBearer = req.headers.authorization.split(' ');
  if (tokenBearer.length != 2) {
    return res.status(401).send({message: 'Malformed token.'});
  }

  const token = tokenBearer[1];
  return jwt.verify(token, c.config.jwt.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({auth: false, message: 'Failed to authenticate.'});
    }
    return next();
  });
}

// Get all feed items
router.get('/GetUsers', async (req: Request, res: Response) => {
  const items = await User.findAll();
  res.send(items);
});

// Get a feed resource
router.get('/:id',
    async (req: Request, res: Response) => {
      const {id} = req.params;
      const item = await User.findByPk(id);
      res.send(item);
    });

// Create feed with metadata
router.post('/Users',
    requireAuth,
    async (req: Request, res: Response) => {
      const user = req.body;

      const item = await new User({
        firstName: user.firstName,
        lastName: user.lastName,
        id: user.id,
        email: user.email
      });

      const savedItem = await item.save();

      savedItem.id = AWS.getGetSignedUrl(savedItem.id);
      res.status(201).send(savedItem);
    });

export const FeedRouter: Router = router;
