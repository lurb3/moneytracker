import express from 'express';

interface AuthenticatedRequest<T> extends express.Request {
  user: {
    _id: string;
  }
}

export { AuthenticatedRequest }