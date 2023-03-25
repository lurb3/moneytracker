import express from 'express';

interface AuthenticatedRequest<T> extends express.Request {
  user: {
    _id: string;
    // other user properties
  }
}

export { AuthenticatedRequest }