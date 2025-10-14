import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import JoinOurWaitlist from '../JoinOurWaitlist'

// Mock Header and Footer components
vi.mock('../Header', () => ({
  default: ({ showBackButton }: { showBackButton?: boolean }) => (
    <header data-testid="header">
      Header {showBackButton && '(with back button)'}
    </header>
  )
}))

vi.mock('../Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>
}))

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('JoinOurWaitlist Component', () => {
  beforeEach(() => {
    mockFetch.mockClear()
  })

  it('renders the waitlist form with all fields', () => {
    render(
      <TestWrapper>
        <JoinOurWaitlist />
      </TestWrapper>
    )

    expect(screen.getByText('Join our')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/waitlist/i)
    
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/i am a/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/consent to safepsy/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /join waitlist/i })).toBeInTheDocument()
  })

  it('allows user to type in form fields', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <JoinOurWaitlist />
      </TestWrapper>
    )

    const fullNameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email address/i)
    const roleSelect = screen.getByLabelText(/i am a/i)
    const consentCheckbox = screen.getByLabelText(/consent to safepsy/i)

    await user.type(fullNameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.selectOptions(roleSelect, 'client')
    await user.click(consentCheckbox)

    expect(fullNameInput).toHaveValue('John Doe')
    expect(emailInput).toHaveValue('john@example.com')
    expect(roleSelect).toHaveValue('client')
    expect(consentCheckbox).toBeChecked()
  })

  it('has required attributes on required form fields', () => {
    render(
      <TestWrapper>
        <JoinOurWaitlist />
      </TestWrapper>
    )

    expect(screen.getByLabelText(/full name/i)).toHaveAttribute('required')
    expect(screen.getByLabelText(/email address/i)).toHaveAttribute('required')
    expect(screen.getByLabelText(/i am a/i)).toHaveAttribute('required')
    expect(screen.getByLabelText(/consent to safepsy/i)).toHaveAttribute('required')
  })

  it('shows validation message for whitespace-only name', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <JoinOurWaitlist />
      </TestWrapper>
    )

    const fullNameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email address/i)
    const roleSelect = screen.getByLabelText(/i am a/i)
    const consentCheckbox = screen.getByLabelText(/consent to safepsy/i)
    const submitButton = screen.getByRole('button', { name: /join waitlist/i })

    // Fill required fields but use whitespace-only name
    await user.type(fullNameInput, '   ')
    await user.type(emailInput, 'john@example.com')
    await user.selectOptions(roleSelect, 'client')
    await user.click(consentCheckbox)
    await user.click(submitButton)

    // Should show validation message
    await waitFor(() => {
      expect(screen.getByText('Please enter your full name')).toBeInTheDocument()
    })
  })

  it('submits form with correct data structure', async () => {
    const user = userEvent.setup()
    
    // Mock successful response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Success!' }),
    })

    render(
      <TestWrapper>
        <JoinOurWaitlist />
      </TestWrapper>
    )

    const fullNameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email address/i)
    const roleSelect = screen.getByLabelText(/i am a/i)
    const consentCheckbox = screen.getByLabelText(/consent to safepsy/i)
    const submitButton = screen.getByRole('button', { name: /join waitlist/i })

    await user.type(fullNameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.selectOptions(roleSelect, 'client')
    await user.click(consentCheckbox)
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: 'John Doe',
          email: 'john@example.com',
          role: 'client',
          consentGiven: true
        })
      })
    })
  })

  it('shows success message after successful submission', async () => {
    const user = userEvent.setup()
    
    // Mock successful response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'You have been added to our waitlist!' }),
    })

    render(
      <TestWrapper>
        <JoinOurWaitlist />
      </TestWrapper>
    )

    const fullNameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email address/i)
    const roleSelect = screen.getByLabelText(/i am a/i)
    const consentCheckbox = screen.getByLabelText(/consent to safepsy/i)
    const submitButton = screen.getByRole('button', { name: /join waitlist/i })

    await user.type(fullNameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.selectOptions(roleSelect, 'client')
    await user.click(consentCheckbox)
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('You have been added to our waitlist!')).toBeInTheDocument()
    })
  })

  it('shows error message for network errors', async () => {
    const user = userEvent.setup()
    
    // Mock network error
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    render(
      <TestWrapper>
        <JoinOurWaitlist />
      </TestWrapper>
    )

    const fullNameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email address/i)
    const roleSelect = screen.getByLabelText(/i am a/i)
    const consentCheckbox = screen.getByLabelText(/consent to safepsy/i)
    const submitButton = screen.getByRole('button', { name: /join waitlist/i })

    await user.type(fullNameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.selectOptions(roleSelect, 'client')
    await user.click(consentCheckbox)
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Network error. Please check your connection and try again.')).toBeInTheDocument()
    })
  })

  it('clears form after successful submission', async () => {
    const user = userEvent.setup()
    
    // Mock successful response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Success!' }),
    })

    render(
      <TestWrapper>
        <JoinOurWaitlist />
      </TestWrapper>
    )

    const fullNameInput = screen.getByLabelText(/full name/i)
    const emailInput = screen.getByLabelText(/email address/i)
    const roleSelect = screen.getByLabelText(/i am a/i)
    const consentCheckbox = screen.getByLabelText(/consent to safepsy/i)
    const submitButton = screen.getByRole('button', { name: /join waitlist/i })

    await user.type(fullNameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.selectOptions(roleSelect, 'client')
    await user.click(consentCheckbox)
    await user.click(submitButton)

    await waitFor(() => {
      expect(fullNameInput).toHaveValue('')
      expect(emailInput).toHaveValue('')
      expect(roleSelect).toHaveValue('')
      expect(consentCheckbox).not.toBeChecked()
    })
  })
})