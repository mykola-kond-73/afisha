import nodemailer from 'nodemailer'

class Mail {
    private transporter:nodemailer.Transporter

    constructor() {
        const createTestAcc=async()=>await nodemailer.createTestAccount()
        let testEmailAccount:any =createTestAcc() 

        let transporterItem = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testEmailAccount.user,
                pass: testEmailAccount.pass,
            },
        });

        this.transporter=transporterItem
    }

    async sendMail(text: string):Promise<boolean> { }
}

export const mailService = new Mail()