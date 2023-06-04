import { QueryClient, QueryFunction } from '@tanstack/react-query';
import client from './axios';

const queryClient = new QueryClient();

export default queryClient;