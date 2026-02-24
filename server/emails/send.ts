import { Resend } from 'resend'
import type { H3Event } from 'h3'

const resend = new Resend(process.env.NUXT_PRIVATE_RESEND_API_KEY)

export default defineEventHandler(async (event: H3Event) => {
  try {
    const body = (await readBody(event))
    const { email, project_type, budget, message, phone, fullname } = body
    return await resend.emails.send({
      from: 'Scriptami <ecrire.a@scriptami.com>',
      to: ['ecrire.a@scriptami.com'],
      subject: `Demande de devis — ${project_type ?? 'Non précisé'}`,
      html: `
      <p>Nouvelle demande de devis reçue depuis scriptami.com.</p>
      <ul>
        <li><strong>Nom :</strong> ${fullname}</li>
        <li><strong>Email :</strong> ${email}</li>
        <li><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</li>
        <li><strong>Type de projet :</strong> ${project_type || 'Non précisé'}</li>
        <li><strong>Budget envisagé :</strong> ${budget || 'Non précisé'}</li>
      </ul>
      <p><strong>Description du projet :</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })
  }
  catch (error) {
    return { error }
  }
})
