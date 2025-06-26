import { v4 as uuidv4 } from 'uuid';
import { Resend } from 'resend';
import User from '@/models/user';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendMail({
  email,
  emailType,
  userId,
}: {
  email: string;
  emailType: 'VERIFY' | 'RESET';
  userId: string;
}) {
  try {
    const token = await uuidv4();

    // Update the user with the correct token
    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verificationToken: token,
        verificationTokenExpiry: Date.now() + 60 * 60 * 1000, // 1 hour
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        resetPasswordToken: token,
        resetPasswordTokenExpiry: Date.now() + 60 * 60 * 1000, // 1 hour
      });
    } else {
      throw new Error('Invalid email type');
    }

    // Compose email content
    const subject =
      emailType === 'VERIFY' ? 'Verify Your Email' : 'Reset Your Password';

    const html = `
      <h1>${subject}</h1>
      <p>Click the link below to ${
        emailType === 'VERIFY' ? 'verify your email' : 'reset your password'
      }:</p>
      <a href="${process.env.domain}/${
        emailType === 'VERIFY' ? 'verify' : 'reset-password'
      }?token=${token}&id=${userId}">
        ${subject}
      </a>
      <p>If you did not request this, please ignore this email.</p>
    `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, message: 'Failed to send email' };
    }

    console.log('Email sent with Resend. ID:', data?.id);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Internal error sending email' };
  }
}
