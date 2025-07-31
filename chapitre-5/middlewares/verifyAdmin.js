import express from 'express';

export default function verifyAdmin(req = express.request, res = express.response, next){
    const xAdminHeader = req.headers['x-admin']
    if(xAdminHeader !== 'true')
      return res.status(403).json({ message: 'Permission denied' });
      next()
}