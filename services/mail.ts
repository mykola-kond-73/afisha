import nodemailer from 'nodemailer'

class Mail {
    private transporter: nodemailer.Transporter|null=null
    private static instance: Mail | null = null

    constructor() {
        if (Mail.instance) return Mail.instance
        else {
            let transporterItem = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD
                }
            });

            this.transporter = transporterItem

            Mail.instance = this
        }
    }

    sendMail(text: string, email: string): boolean {
        this.transporter!.sendMail({
            from: `<${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Message from Afisha',
            text: text,
        },
            (error, info) => {
                if (error) console.log(error)
                console.log(info)
            })

        return true
    }
}

export const mailService = new Mail()