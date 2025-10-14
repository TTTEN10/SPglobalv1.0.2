/**
 * Abstract email service interface for SafePsy landing page
 * 
 * This service provides a clean abstraction layer for email providers,
 * allowing easy switching between SendGrid, Resend, Mailgun, etc.
 */

export interface EmailProvider {
  sendConfirmationEmail(email: string): Promise<void>
}

export interface EmailServiceConfig {
  provider: EmailProvider
  enabled: boolean
}

/**
 * Stub email provider that logs confirmation emails instead of sending them
 * This is used for development and testing purposes
 */
export class StubEmailProvider implements EmailProvider {
  async sendConfirmationEmail(email: string): Promise<void> {
    console.log(`[EMAIL STUB] Confirmation email would be sent to: ${email}`)
    console.log(`[EMAIL STUB] Email content: Welcome to SafePsy! You've successfully joined our waitlist.`)
    console.log(`[EMAIL STUB] Timestamp: ${new Date().toISOString()}`)
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100))
  }
}

/**
 * Email service that manages email operations with feature flagging
 */
export class EmailService {
  private config: EmailServiceConfig

  constructor(config: EmailServiceConfig) {
    this.config = config
  }

  /**
   * Send a confirmation email if the feature is enabled
   */
  async sendConfirmationEmail(email: string): Promise<void> {
    if (!this.config.enabled) {
      console.log(`[EMAIL SERVICE] Confirmation email feature is disabled, skipping email to: ${email}`)
      return
    }

    try {
      await this.config.provider.sendConfirmationEmail(email)
      console.log(`[EMAIL SERVICE] Confirmation email sent successfully to: ${email}`)
    } catch (error) {
      console.error(`[EMAIL SERVICE] Failed to send confirmation email to ${email}:`, error)
      // Don't throw - email failures shouldn't break the subscription flow
    }
  }

  /**
   * Check if the email service is enabled
   */
  isEnabled(): boolean {
    return this.config.enabled
  }
}

/**
 * Factory function to create email service with environment configuration
 */
export function createEmailService(): EmailService {
  const enabled = process.env.ENABLE_CONFIRMATION_EMAIL === 'true'
  const provider = new StubEmailProvider()

  return new EmailService({
    provider,
    enabled,
  })
}
