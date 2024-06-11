import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountCard from '..';

describe('AccountCard', () => {
  it('renders account card with user data', () => {
    const userData = { id: '123', email: 'test@email.com', firstName: "Name", lastName: "Lastname" };
    const onLogoutMock = jest.fn();

    render(<AccountCard userData={userData} onLogout={onLogoutMock} />);

    expect(screen.getByText('Account Page')).toBeInTheDocument();
    expect(screen.getByText(`${userData.id}`)).toBeInTheDocument();
  });

  it('calls onLogout function when logout button is clicked', () => {
    const userData = { id: '123', email: 'test@email.com', firstName: "Name", lastName: "Lastname" };
    const onLogoutMock = jest.fn();

    render(<AccountCard userData={userData} onLogout={onLogoutMock} />);

    fireEvent.click(screen.getByText('Logout'));
    expect(onLogoutMock).toHaveBeenCalled();
  });
});
