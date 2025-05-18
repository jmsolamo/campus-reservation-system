import { render, screen } from '@testing-library/react';
import App from './App'; // Keep this import if App is still used in other tests

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
