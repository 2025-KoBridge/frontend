import { ROUTES } from '@/constants/routes';
import { redirect } from 'next/navigation';

export default function MainPage() {
  redirect(ROUTES.MAIN.MY_LEARNING);
}
