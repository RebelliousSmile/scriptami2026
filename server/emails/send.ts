import { Resend } from 'resend'
import type { H3Event } from 'h3'

const resend = new Resend(process.env.NUXT_PRIVATE_RESEND_API_KEY)

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = (await readBody(event))
    const { email, subject, message, phone, fullname } = body
    return await resend.emails.send({
      from: 'Scriptami <ecrire.a@scriptami.com>',
      to: ['ecrire.a@scriptami.com'],
      subject: 'Nouveau message de Scriptami',
      html: `
      <p>Un nouveau message a été envoyé depuis le formulaire de contact de Scriptami.</p>
      <p>Voici les détails du message :</p>
      <ul>
        <li>Nom : ${fullname}</li>
        <li>Email : ${email}</li>
        <li>Téléphone : ${phone}</li>
        <li>Sujet : ${subject}</li>
        <li>Message : ${message}</li>
      </ul>
      `,
    })
  }
  catch (error) {
    return { error }
  }
})
