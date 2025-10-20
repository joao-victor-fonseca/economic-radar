import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock Clerk components so tests don't need a real ClerkProvider
jest.mock('@clerk/nextjs', () => ({
  __esModule: true,
  SignedIn: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SignedOut: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  SignInButton: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  UserButton: () => <button data-testid="user-button">User</button>,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: () => '',
}));

jest.mock('@/components/MobileNav', () => ({
  __esModule: true,
  default: () => <div data-testid="mobile-nav" />,
}));

import Navbar from '../Navbar';

describe('Navbar', () => {
  it('renders logo and login button when signed out', () => {
    render(<Navbar />);

    expect(screen.getByText(/Economic Radar/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /LOGIN/i })).toBeInTheDocument();
  });
});
