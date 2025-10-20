import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../Sidebar';

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => '',
}));

jest.mock('@/constants', () => ({
  sidebarLinks: [
    { label: 'Home', route: '/', imgUrl: '/icons/Home.svg' },
    { label: 'Dashboard', route: '/dashboard', imgUrl: '/icons/dashboard.svg' },
  ],
}));

describe('Sidebar', () => {
  it('renders links from constants', () => {
    render(<Sidebar />);

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });
});
