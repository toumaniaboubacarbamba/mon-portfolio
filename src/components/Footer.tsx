import { Container, Facebook, Linkedin, Mail, School } from "lucide-react"

const Footer = () => {
    return (
        <footer className="footer footer-center  p-10">
            <aside>

                <Container className="w-10 h-10" />
                <p className="font-bold">
                    Toumani
                    <span className="text-accent">DEV FULLSTACK</span>
                </p>
                <p>Copyright © {new Date().getFullYear()} -  Tous droits réservés</p>
            </aside>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a href="https://mail.google.com/mail/u/0/?fs=1&to=bambaaboubacartoumani@gmail.com&su=Subject&body=Message" target="_blank" rel="noopener noreferrer">
                        <Mail className="w-6 h-6 text-current" />
                    </a>
                    <a href="https://www.instagram.com/aboubacartoumani/" target="_blank" rel="noopener noreferrer">
                        <School className="w-6 h-6 text-current" />
                    </a>
                    <a href="https://www.facebook.com/Bamba.Aboubacar.Toumani/" target="_blank" rel="noopener noreferrer">
                        <Facebook className="w-6 h-6 text-current" />
                    </a>
                    <a href="https://ci.linkedin.com/in/aboubacar-toumani-bamba-13b67025b" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-6 h-6 text-current" />
                    </a>
                </div>
            </nav>
        </footer>
    )
}

export default Footer
